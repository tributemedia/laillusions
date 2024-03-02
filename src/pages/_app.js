import React from 'react';
import Script from "next/script";

import { AppProvider } from '@/context';

import '@/styles/globals.scss'
import '@/styles/header.scss'
import '@/styles/footer.scss'
import '@/styles/landingFirstScreen.scss'
import '@/styles/blockProject.scss'
import '@/styles/blockGetYourTicket.scss'
import '@/styles/blockPromotions.scss'
import '@/styles/blockComments.scss'
import '@/styles/blockMaps.scss'
import '@/styles/blockBlogs.scss'
import '@/styles/ticketsScreen.scss'
import '@/styles/blogFirstScreen.scss'
import '@/styles/blogPosts.scss'
import '@/styles/blogArticle.scss'
import '@/styles/blogArticleShare.scss'
import '@/styles/blogArticleComment.scss'
import '@/styles/blogArticleFAQ.scss'
import '@/styles/blogComment.scss'
import '@/styles/projectFirst.scss'
import '@/styles/projectSlider.scss'
import '@/styles/promotionFirstScreen.scss'
import '@/styles/blogContact.scss'
import '@/styles/formSubmit.scss'
import '@/styles/blockScrolling.scss'
import '@/styles/promotionSlider.scss'
import '@/styles/blockCheckout.scss'
import '@/styles/policy.scss'
import '@/styles/calendar.scss'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <AppProvider>
        {getLayout(<Component {...pageProps} />)}
      </AppProvider>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5SXDLZL');
        `}
      </Script>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '408857071692308');
            fbq('track', 'PageView');
          `
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style="display:none"
          src=" https://www.facebook.com/tr?id=408857071692308&ev=PageView&noscript=1"
        />
      </noscript>
    </>
    )
}
