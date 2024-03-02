import MainLayout from '@/layouts/main';
// import dynamic from 'next/dynamic';
import BlogApiService from "@/services/blog";
import BlogFirstScreen from "@/sections/blog/blogFirstScreen";
import BlogPosts from "@/sections/blog/blogPosts";
// ------------------------------------------------------------

Blog.getLayout = (page) => <MainLayout> {page} </MainLayout>;

// ------------------------------------------------------------

// const BlogFirstScreen = dynamic(() => import('../../sections/blog/blogFirstScreen'));
// const BlogPosts = dynamic(() => import('../../sections/blog/blogPosts'));

export default function Blog({ posts, categories, pages, total }) {
  return (
    <>
      <BlogFirstScreen categories={categories} />

      <BlogPosts
        posts={posts}
        pages={pages}
        total={total}
      />
    </>
  )
}

export async function getStaticProps() {
  const categories = await BlogApiService.getCategories();
  const { posts, pages, total } = await BlogApiService.getBlogData({ per_page: 10 });

  return {
    props: {
      posts,
      categories,
      pages,
      total
    },
    revalidate: 10,
  };
}
