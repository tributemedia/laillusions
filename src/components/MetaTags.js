/* eslint-disable */
import Head from "next/head";
import { usePathname } from 'next/navigation'
import { HOST_SITE_URL, META_FB_ID } from "@/config-global";

export default function MetaTags(
  {
    title,
    description = 'Step into Hollywood’s famous Los Angeles World of Illusions & Upside Down House. Plan your visit today!',
    images,
    type,
  }) {
  const pathname = usePathname();

  return (
    <Head>
      <title>{`${title ?? 'Interactive Experience in Hollywood, Los Angeles'} | World of Illusions`}</title>
      <meta name="description"
            content={description}/>
      <link rel="icon" href="/favicon/favicon-100x100.png" sizes="32x32"/>
      <link rel="apple-touch-icon" href="/favicon/favicon.png"/>

      <meta property="og:url" content={`${HOST_SITE_URL}${pathname}`} />
      <meta property="og:type" content={type ?? "article"} />
      <meta property="og:title" content={`${title ?? 'Interactive Experience in Hollywood, Los Angeles'} | World of Illusions`} />
      <meta property="fb:app_id" content={META_FB_ID} />
      <meta property="og:description"
            content={description ?? 'Step into Hollywood’s famous Los Angeles World of Illusions & Upside Down House. Plan your visit today!'}/>
      <meta property="og:image"
            content={images ?? "https://admin.laillusions.com/wp-content/uploads/2019/01/favicon.png"}/>

    </Head>
  );
}