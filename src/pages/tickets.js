import dynamic from 'next/dynamic';
import axios from "axios";

import MainLayout from '@/layouts/main';
import { HOST_SITE_URL } from "@/config-global";
import TicketsScreen from "@/sections/tickets/ticketsScreen";
const MetaTags = dynamic(() => import('@/components/MetaTags'));

Tickets.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// const TicketsScreen = dynamic(() => import('../sections/tickets/ticketsScreen'));

export default function Tickets({ tickets }) {
  return (
    <>
      <MetaTags
        title="World of Illusions"
        description="Explore the World of Illusions in Los Angeles. Uncover a mesmerizing world where reality twists and dreams come alive. Purchase your tickets to this fascinating LA museum and let your imagination run wild. Delve into the unexpected, only at the World of Illusions."
      />
      <TicketsScreen tickets={tickets} />
    </>
  )
}

export async function getStaticProps() {
  const { data } = await axios.get(`${HOST_SITE_URL}/api/get-products?status=instock`);

  const products = data?.products?.map((item) => ({
    id: item.id,
    name: item.name,
    shortDescription: item.short_description,
    price: item?.price,
    regularPrice: item?.regular_price,
    order: item?.menu_order,
    salePrice: item?.sale_price,
    weekdays: item?.attributes?.find(item => item.name === 'weekdays')?.options[0] ?? null ,
  })) ?? [];

  return {
    props: {
      tickets: products,
    },
    revalidate: 10
  };
}
//
// export async function getServerSideProps() {
//   const { data } = await axios.get(`${HOST_SITE_URL}/api/get-products`);
//
//   return {
//     props: {
//       tickets: data?.products ?? [],
//     },
//   };
// }
