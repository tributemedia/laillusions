/* eslint-disable */
import { Html, Head, Main, NextScript } from 'next/document'
import React from "react";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5SXDLZL');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <noscript
        id="google_tag_manager"
        dangerouslySetInnerHTML={{
          __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5SXDLZL" height="0" width="0" style="display: none; visibility: hidden;" />`,
        }}
      />
      <noscript
        id="meta_pixel"
        dangerouslySetInnerHTML={{
          __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=845466662497599&ev=PageView&noscript=1" alt="facebook"/>`,
        }}
      />
    </Html>
  )
}
