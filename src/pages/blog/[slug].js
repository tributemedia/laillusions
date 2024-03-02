import dynamic from 'next/dynamic';
// layouts
import MainLayout from '@/layouts/main'
import BlogApiService from "@/services/blog";
import {PATH_PAGE} from "@/routes/paths";
import BlogArticleShare from "@/sections/blog/blogArticleShare";
import BlogArticleComment from "@/sections/blog/blogArticleComment";
import BlockBlogs from "@/sections/global/blockBlogs";
// -----------------------------------------------------------------------------------------------
const BlogArticleBreadcrumb = dynamic(() => import('../../sections/blog/blogArticleBreadcrumb'));
const BlogArticleContent = dynamic(() => import('../../sections/blog/blogArticleContent'));
const MetaTags = dynamic(() => import('@/components/MetaTags'));

// -----------------------------------------------------------------------------------------------
Article.getLayout = (page) => <MainLayout> {page} </MainLayout>;
// -----------------------------------------------------------------------------------------------

export default function Article(props) {
  const { post, latest, comments } = props;

  return (
    <>
      <MetaTags 
        title={post?.title}
        description={post?.title}
        images={post?.image.thumbnail}
      />
      <div className={`blogArticle relative`}>
        <div className="container">
          <BlogArticleBreadcrumb
            breadcrumbs={[
              {id: 1, name: 'Home', href: PATH_PAGE.landing},
              {id: 2, name: 'Blog', href: PATH_PAGE.blog.blog},
              {id: 3, name: post?.title || '', href: PATH_PAGE.blog.view(post.slug)},
            ]}
          />
          <BlogArticleContent {...post} />
        </div>
      </div>

      <BlogArticleShare />
      <BlogArticleComment comments={comments?.content || []} post={post} />
      
      <BlockBlogs latest={latest}/>
    </>
  )
}

export async function getServerSideProps({ params: { slug } }) {
  const postRes = await BlogApiService.getBlogData({ slug })
  const latestPosts = await BlogApiService.getBlogData({ per_page: 3 })

  const post = postRes?.posts[0] || null;

  const comments = !!post?.id
    ? await BlogApiService.getCommentsList({
        post: post?.id
      })
    : [];

  return {
    props: {
      post,
      comments,
      latest: latestPosts?.posts || []
    }
  };
}

