import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
import { formatPost } from '@/utils/formatBlog';

Home.getLayout = (page) => <MainLayout> {page} </MainLayout>;

const LandingFirstScreen = dynamic(() => import('../sections/landing/landingFirstScreen'));
const MetaTags = dynamic(() => import('@/components/MetaTags'));
const BlockProject = dynamic(() => import('../sections/global/blockProject'), { ssr: false });
const BlockGetYourTicket = dynamic(() => import('../sections/global/blockGetYourTicket'), { ssr: false });
const BlockPromotions = dynamic(() => import('../sections/landing/blockPromotions'), { ssr: false });
const BlockComments = dynamic(() => import('../sections/landing/blockComments'), { ssr: false });
const BlockMaps = dynamic(() => import('../sections/global/blockMaps'), { ssr: false });
const BlockBlogs = dynamic(() => import('../sections/global/blockBlogs'), { ssr: false });

export default function Home(props) {

  return (
    <>
      <MetaTags
        title="Interactive Experience in Hollywood, Los Angeles | World of Illusions"
        description="Step into Hollywood’s famous Los Angeles World of Illusions & Upside Down House. Plan your visit today!"
      />
      
      <LandingFirstScreen />
      
      <BlockProject />
      
      <BlockGetYourTicket />
      
      <BlockPromotions />
      
      <BlockComments />

      <BlockMaps title="World of Illusions." />
      
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
