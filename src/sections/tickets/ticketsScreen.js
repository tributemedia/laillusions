import { useContext, useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { useForm } from "react-hook-form"

import { AppContext } from '@/context';

import FormProvider, { RHFTicket } from "@/components/hook-form";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import { PATH_PAGE } from "@/routes/paths";
import { fCurrency } from "@/utils/formatNumber";
import { gtmPush } from "@/utils/gtmPush";
import { fbq } from "@/utils/fbqMeta";

export default function TicketsScreen({ tickets }) {
  const [card, setTicket] = useContext(AppContext);

  const methods = useForm({
    defaultValues: card
  });
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);

  let newDate = new Date();
  let numberDayPrice = newDate.getDay() >= 5;

  const {
    watch,
    handleSubmit,
  } = methods;

  const onSubmit = async (data) => {
    setLoading(true)
    setTicket(data);
    gtmPush({
      'event': 'click_buy_tickets',
      ecommerce: undefined
    })
    fbq('track', 'click_buy_tickets');
    await push(PATH_PAGE.checkout)
  };

  useEffect(() => {
    const ticketsSelect = watch();
    const list = tickets?.map(item => ({
      ticket: String(item.id),
      price: item.price * Number(ticketsSelect[item.id])
    }));

    setTotal(list?.map(item => item.price)?.reduce((a, b) => Number(a) + Number(b), 0));
    localStorage.removeItem( 'next-coupon' );
    // eslint-disable-next-line
  }, [watch()])

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <div className={`relative min-h-screen ticketsScreen`}>
        <div className="container">
          <h2  className="ticketsScreen__city">
            LOS ANGELES
          </h2>

          <h1 className="ticketsScreen__title">Tickets</h1>
          <div className="ticketsScreen__box">
            <div className="ticketsScreen__items">
              {tickets
                ?.sort((a, b) => a?.order - b?.order)
                ?.map((item) => (
                <div key={item.id} className="ticketsScreen__item flex ">
                  <div className="ticketsScreen__item_info">
                    <div className="ticketsScreen__item_info-name">{item?.name}</div>
                    <div className="ticketsScreen__item_info-text">{parse(item?.shortDescription)}</div>
                  </div>
                  <div>
                    <div className="ticketsScreen__item_add">
                      <div className="ticketsScreen__item_price">
                        <div className="ticketsScreen__item_price-coin">${item?.price}</div>
                        {Number(item?.regularPrice ?? 0) !== Number(item?.price ?? 0) && (
                          <div className="ticketsScreen__item_price-full">${item?.regularPrice}</div>
                        )}
                      </div>
                      {/*<div className="ticketsScreen__item_add-text">{!numberDayPrice ? "Start at(price Mon-Thu)" : "Fri-Sun Price"}</div>*/}
                      <div className="ticketsScreen__item_add-text">Start at(price Mon-Thu)</div>
                    </div>
                  </div>
                  <RHFTicket name={String(item.id)} item={item} />
                </div>
              ))}
            </div>
            <div className={`boxButtonPurple ${!total}`}>
              <button
                className="buttonPurple relative"
                type="submit"
                disabled={!total}
              >
                {loading ? (
                  <Loading loading={loading}/>
                ) : (
                  `Buy tickets ${total > 0 ? fCurrency(total) : ''}`
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
