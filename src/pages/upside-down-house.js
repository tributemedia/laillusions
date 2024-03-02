import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
import { formatPost } from '@/utils/formatBlog';
Project.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const ProjectFirstScreen = dynamic(() => import('../sections/project/upsideDownHouse/projectFirstScreen'));
const MetaTags = dynamic(() => import('@/components/MetaTags'));
// const ProjectSlider = dynamic(() => import('../sections/project/upsideDownHouse/ProjectSlider'), { ssr: false });
const ProjectSlider2 = dynamic(() => import('../sections/project/upsideDownHouse/ProjectSlider2'), { ssr: false });
const BlockGetYourTicket = dynamic(() => import('../sections/global/blockGetYourTicket'), { ssr: false });
const BlockMaps = dynamic(() => import('../sections/global/blockMaps'), { ssr: false });
const BlockBlogs = dynamic(() => import('../sections/global/blockBlogs'), { ssr: false });

export default function Project(props) {
  return (
    <>
      <MetaTags
        title="Upside Down House | Los Angeles | Museum of Illusions"
        description="Explore the World of Illusions' newest addition, the Upside Down House in Los Angeles. Experience 7 interactive rooms, including a bedroom, bathroom, and kitchen, as you walk on walls and amaze friends with photos of you dancing on the ceiling. A unique house party awaits!"
      />
      <ProjectFirstScreen />

      {/*<ProjectSlider />*/}
      <ProjectSlider2 />
      
      <BlockGetYourTicket />
      
      <BlockMaps
        title="UPSIDE DOWN HOUSE"
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
