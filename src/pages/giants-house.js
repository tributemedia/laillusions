import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
import { formatPost } from '@/utils/formatBlog';
Project.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const ProjectFirstScreen = dynamic(() => import('../sections/project/giantsHouse/projectFirstScreen'));
const MetaTags = dynamic(() => import('@/components/MetaTags'));
// const ProjectSlider = dynamic(() => import('../sections/project/giantsHouse/ProjectSlider'), { ssr: false });
const ProjectSlider2 = dynamic(() => import('../sections/project/giantsHouse/ProjectSlider2'), { ssr: false });
const BlockGetYourTicket = dynamic(() => import('../sections/global/blockGetYourTicket'), { ssr: false });
const BlockMaps = dynamic(() => import('../sections/global/blockMaps'), { ssr: false });
const BlockBlogs = dynamic(() => import('../sections/global/blockBlogs'), { ssr: false });

export default function Project(props) {
  return (
    <>
      <MetaTags
        title="Giant's House | World of Illusion"
        description="Discover the Giant's House in Los Angeles, where you'll experience a world of big houses and larger-than-life items. Feel what it’s like to be mere inches tall among 31 enormous objects, including the world's largest can of soda and shoes fit for King Kong. Capture unforgettable photos at this unique attraction."
      />
      <ProjectFirstScreen />

      {/*<ProjectSlider />*/}
      <ProjectSlider2 />
      
      <BlockGetYourTicket />

      <BlockMaps
        title="Giant’s House"
      />
      
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
