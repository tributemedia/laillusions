import React, { Fragment } from "react";
import axios from "axios";

import MainLayout from '@/layouts/main';

import { HOST_SITE_URL } from "@/config-global";
import dynamic from "next/dynamic";
import uuidv4 from "@/utils/uuidv4";
import { fCurrency } from "@/utils/formatNumber";

Id.getLayout = (page) => <MainLayout> {page} </MainLayout>;

const MetaTags = dynamic(() => import('@/components/MetaTags'));

export default function Id({ order }) {
  const subtotal = order.line_items.map(item => Number(item?.subtotal)).reduce((a, b) => a + b, 0);

  return (
    <>
      <MetaTags/>
      <div className="blockCheckout">
        <div className="blockCheckout__top">
          <div className="blockCheckout__top_title">Your order #{order.id}</div>
        </div>
        <div className="checkout__order mt-8 w-full">
          <div className="container pb-3">
            <div className="mt-2 p-8 rounded-3xl ring-1 ring-gray-200 checkout__order_items flex gap-4">
              <div className="w50 ">
                <div className="checkout__titleSmall pb-4">Product</div>
                {order.line_items.map((item) => (
                  <div key={uuidv4()} className="checkout__order_product flex items-center justify-between pb-3">
                    <p className="text-base text-gray-600 pr-1">{item.name} × {item.quantity}</p>
                    <p className="flex items-baseline justify-center gap-x-2">
                      <span className="text-1xl tracking-tight text-gray-600">${(item?.price) * item.quantity}</span>
                      <span className="text-sm  leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="w50">
                <div
                  className="rounded-2xl p-4 bg-gray-50 py-6 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center"
                >
                  <div className="product__price flex items-center justify-between pb-3">
                    <p className="text-base font-semibold text-gray-600">Subtotal</p>
                    <p className="flex items-baseline justify-center gap-x-2">
                      <span className="text-2xl font-bold tracking-tight text-gray-600">${subtotal}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                  </div>
                  <div className="product__price flex items-center justify-between pb-3">
                    <div>
                      <p
                        style={{
                          maxWidth: '300px',
                          overflow: 'hidden',
                          textWrap: 'nowrap',
                          textOverflow: 'ellipsis',
                          paddingRight: '20px'
                        }}
                        className="text-base font-semibold text-gray-600 relative"
                      >
                        Coupon: {order.coupon_lines[0]?.code}
                      </p>
                    </div>
                    <p className="flex items-baseline justify-center gap-x-2">
                          <span className="text-2xl font-bold tracking-tight text-gray-600">
                            - {fCurrency(order.coupon_lines[0]?.discount)}
                          </span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                  </div>
                  <div className="product__price flex items-center justify-between">
                    <p className=" text-2xl font-semibold text-gray-600">Total</p>
                    <p className="flex items-baseline justify-center gap-x-2">
                      <span className="text-3xl font-bold tracking-tight colorPurple">{fCurrency(order.total)}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps({ params: { id } }) {
  try {
    const { data: { order } } = await axios.get(`${HOST_SITE_URL}/api/get-order`, { params: { id } });

    console.log(order)
    return {
      props: {
        order: order ?? {},
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        order: {},
        error: e
      },
    };
  }
}
