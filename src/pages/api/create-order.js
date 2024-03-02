import { WooCommerceAPI } from "@/utils/wooCommerceApi";
import { isEmpty } from 'lodash';

export default async function handler( req, res ) {
  const responseData = {
    success: false,
    orderId: '',
    total: '',
    currency: '',
    error: '',
  };

  if ( isEmpty( req.body ) ) {
    responseData.error = 'Required data not sent';
    return responseData;
  }

  const data = req.body;
  data.status = req?.body?.status ?? 'processing';
  data.set_paid = false;

  if (req.body)

  try {
    const { data } = await WooCommerceAPI.post(
      'orders',
      req.body,
    );

    responseData.success = true;
    responseData.orderId = data.number;
    responseData.total = data.total;
    responseData.currency = data.currency;
    responseData.paymentUrl = data.payment_url;
    responseData.status = data?.status;
    responseData.code = data?.code;
    responseData.message = data?.message;

    res.json( responseData );

  } catch ( error ) {
    console.error( 'error', error );
    responseData.error = error.message;
    responseData.code = error?.data?.code;
    responseData.message = error?.data?.message;
    res.status( 500 ).json( responseData );
  }
}