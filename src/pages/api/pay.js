import { Client } from "square";
import uuidv4 from "@/utils/uuidv4";
import { WooCommerceAPI } from "@/utils/wooCommerceApi";
import axios from "axios";
import { HOST_API_KEY } from "@/config-global";


BigInt.prototype.toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken: 'sq0atp-WsDNVSfwFLixXh8vVfV_2g',
  environment: "production",
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    await WooCommerceAPI.put(
      `orders/${req?.body.order}`,
      {
        status: "pending",
      }
    );
    await WooCommerceAPI.post(
      `orders/${req?.body.order}/notes`,
      {
        note: "Order status changed from Pending payment to Processing."
      }
    );
    try {
      const timeApoit = req?.body?.timeCalendar ?? [];

      if (timeApoit.length !== 0) {
        const info = await paymentsApi.createPayment({
          idempotencyKey: uuidv4(),
          customerId: uuidv4(),
          sourceId: req.body.sourceId,
          note: req?.body.note,
          referenceId: req?.body.order,
          amountMoney: {
            currency: "USD",
            amount: Number(req.body.amount.replaceAll('$', '')) * 100,
          },
          billingAddress: {
            ...req?.body.user,
            addressLine1: req?.body.user.address1,
            addressLine2: req?.body.user.address2,
            postalCode: req?.body.user.postcode,
            administrativeDistrictLevel1: req?.body.user.state,
          }
        });


        await WooCommerceAPI.post(
          `orders/${req?.body.order}/notes`,
          {
            note: `APPOINTMENTS - ${timeApoit.map((item) => (`date: ${item?.date}, calendar_id: ${item?.calendar_id}, timeslot: ${item?.timeslot}, timestamp: ${item?.timestamp ?? generateTimestamp(item?.date, item?.timeslot)}`))}`
          }
        );

        const { data } = await WooCommerceAPI.put(
          `orders/${req?.body.order}`,
          {
            status: info.result.payment.status.toLowerCase(),
            transaction_id: info.result.payment.id,
          }
        );

        const resultTime = Promise.all(timeApoit.map((item) => {
          const formData = new FormData();
          formData.append('action', "booked_add_appt");
          formData.append('date', item.date);
          formData.append('calendar_id', item.calendar_id);
          formData.append('timeslot', item.timeslot);
          formData.append('timestamp', item?.timestamp);
          formData.append('guest_name', req?.body.user.firstName);
          formData.append('guest_surname', req?.body.user.lastName);
          formData.append('guest_email', req?.body.user.email);
          formData.append('customer_type', "guest");

          return axios.post(`${HOST_API_KEY}/wp-admin/admin-ajax.php`, formData)
        }))

        const infoPayment = JSON.parse(info.body).payment;
        const card_details = infoPayment.card_details.card || {};

        await WooCommerceAPI.post(
          `orders/${req?.body.order}/notes`,
          {
            note: `Square Charge Approved: ${card_details?.card_brand} ending in ${card_details.last_4} (expires ${card_details.exp_month}/${card_details.exp_year}) (Transaction ID ${info.result.payment.id})`
          }
        );
        res
          .status(200)
          .json({
            sourceId: req.query.sourceId,
            amount: req.query.amount,
            payment: info.result.payment,
            orderDetails: data,
            resultTime
          });
      }
      else {
        await WooCommerceAPI.put(
          `orders/${req?.body.order}`,
          {
            status: "failed"
          }
        );
        res.status(400).send({
          status: "failed",
          message: 'An error occurred while booking your stay, please try again later'
        });
      }

    } catch (e) {
      await WooCommerceAPI.put(
        `orders/${req?.body.order}`,
        {
          status: "failed"
        }
      );
      res.status(401).send({
        status: "failed",
        error: JSON.parse(e.body).errors,
        message: "There was an error during payment, try again later or use a different credit card."
      });
    }

  } else {
    await WooCommerceAPI.put(
      `orders/${req?.body.order}`,
      {
        status: "reject"
      }
    );
    res.status(500).send({
      status: "reject"
    });
  }
}
