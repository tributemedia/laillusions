import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
import { formatPost } from '@/utils/formatBlog';
Project.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const ProjectFirstScreen = dynamic(() => import('../sections/project/museumOfIllusions/projectFirstScreen'));
const MetaTags = dynamic(() => import('@/components/MetaTags'));
// const ProjectSlider = dynamic(() => import('../sections/project/museumOfIllusions/ProjectSlider'), { ssr: false });
const ProjectSlider2 = dynamic(() => import('../sections/project/museumOfIllusions/ProjectSlider2'), { ssr: false });
const BlockGetYourTicket = dynamic(() => import('../sections/global/blockGetYourTicket'), { ssr: false });
const BlockMaps = dynamic(() => import('../sections/global/blockMaps'), { ssr: false });
const BlockBlogs = dynamic(() => import('../sections/global/blockBlogs'), { ssr: false });

export default function Project(props) {
  return (
    <>
      <MetaTags
        title="Museum of Illusions | World of Illusions"
        description="Los Angeles' Museum of Illusions has undergone a significant upgrade, with entirely new exhibitions of 3D illusions being unveiled. The new illusions provide an even more immersive and mesmerizing experience. Top artists from around the world participated in the upgrade, and tickets are now available to see the incredible photos and exhibitions."
      />
      <ProjectFirstScreen />

      {/*<ProjectSlider />*/}
      <ProjectSlider2 />
      
      <BlockGetYourTicket />
      
      <BlockMaps
        title="Museum of Illusions"
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
