import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
import { formatPost } from '@/utils/formatBlog';
SchoolGroups.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const PromotionFirstScreen = dynamic(() => import('../sections/promotion/experience/promotionFirstScreen'));
const BlockContactUs = dynamic(() => import('../sections/promotion/blockContactUs'), { ssr: false });
// const BlockScrolling = dynamic(() => import('../sections/promotion/blockScrolling'), { ssr: false });
const BlockGetYourTicket = dynamic(() => import('../sections/global/blockGetYourTicket'), { ssr: false });
const BlockFAQ = dynamic(() => import('../sections/promotion/experience/blockFAQ'), { ssr: false });
const BlockBlogs = dynamic(() => import('../sections/global/blockBlogs'), { ssr: false });
  


export default function SchoolGroups(props) {
  return (
    <>
      <PromotionFirstScreen />
      
      <BlockContactUs />
      
      <BlockGetYourTicket />
      
      {/*<BlockScrolling />*/}

      <BlockFAQ />
      
      <BlockBlogs latest={props.latest} />

    </>
  )
}

export async function getStaticProps() {
  const latest = await fetch(`https://admin.laillusions.com/wp-json/wp/v2/posts?_embed&per_page=3`)
    .then((res) => res.json())
    .then((data) => data.map((item) => formatPost(item)));

  return {
    props: {
      latest,
    },
    revalidate: 10,
  };
}
