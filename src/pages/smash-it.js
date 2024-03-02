import MainLayout from '@/layouts/main';
import dynamic from 'next/dynamic';
import { formatPost } from '@/utils/formatBlog';
Project.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const ProjectFirstScreen = dynamic(() => import('../sections/project/smashIt/projectFirstScreen'));
const MetaTags = dynamic(() => import('@/components/MetaTags'));
// const ProjectSlider = dynamic(() => import('../sections/project/smashIt/ProjectSlider'), { ssr: false });
const ProjectSlider2 = dynamic(() => import('../sections/project/smashIt/ProjectSlider2'), { ssr: false });
const BlockGetYourTicket = dynamic(() => import('../sections/global/blockGetYourTicket'), { ssr: false });
const BlockMaps = dynamic(() => import('../sections/global/blockMaps'), { ssr: false });
const BlockBlogs = dynamic(() => import('../sections/global/blockBlogs'), { ssr: false });

export default function Project(props) {
  return (
    <>
      <MetaTags
        title="Smash it! | World of Illusions"
        description="Unwind at Smash It, a rage room in Los Angeles, designed for stress relief and fun through plate smashing. Write your troubles on plates and smash them away, creating unforgettable memories and photos. This unique, exhilarating experience is open to young adults and adults ages 12 and up."
      />
      <ProjectFirstScreen />

      {/*<ProjectSlider />*/}
      <ProjectSlider2 />
      
      <BlockGetYourTicket />

      <BlockMaps
        title="Smash it!"
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
