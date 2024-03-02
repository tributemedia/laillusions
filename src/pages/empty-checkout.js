import React from "react";

import { PATH_PAGE } from '@/routes/paths'

import MainLayout from "@/layouts/main";

EmptyCheckout.getLayout = (page) => <MainLayout> {page} </MainLayout>;

export default function EmptyCheckout() {
  return (
    <div className="blockCheckout">
      <div className="blockCheckout__top">
        <div className="blockCheckout__top_title">Checkout</div>
      </div>
      <div className="mt-40 text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">No Tikets</h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, you haven&apos;t selected any tickets.
          <br/>
          Please click the &quot;Go to Tickets&quot; button to select tickets
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href={PATH_PAGE.tickets}
            className="buttonPurple"
            onClick={() => {
              window.dataLayer = window.dataLayer || [];
              dataLayer.push({
                'event': 'click_tickets'
              });
            }}
          >
            Go to Tickets
          </a>
        </div>
      </div>
    </div>
  )
}
