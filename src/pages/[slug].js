import dynamic from 'next/dynamic';
import { useRouter } from "next/router";
// layouts
import MainLayout from '@/layouts/main'
import BlogApiService from "@/services/blog";
import {PATH_PAGE} from "@/routes/paths";
import { useEffect } from "react";
// -----------------------------------------------------------------------------------------------
const BlogArticleBreadcrumb = dynamic(() => import('../sections/blog/blogArticleBreadcrumb'));
const BlogArticleContent = dynamic(() => import('../sections/blog/blogArticleContent'));
const MetaTags = dynamic(() => import('@/components/MetaTags'));
const BlogArticleShare = dynamic(() => import('../sections/blog/blogArticleShare'), { ssr: false });
const BlogArticleComment = dynamic(() => import('../sections/blog/blogArticleComment'), { ssr: false });
const BlockBlogs = dynamic(() => import('../sections/global/blockBlogs'), { ssr: false });
// -----------------------------------------------------------------------------------------------
Article.getLayout = (page) => <MainLayout> {page} </MainLayout>;
// -----------------------------------------------------------------------------------------------

export default function Article(props) {
  const { post, latest, comments } = props;

  const { push } = useRouter();

  useEffect(() => {
    if (!post?.id) {
      push('404');
    }
    // eslint-disable-next-line
  }, [post?.id]);

  return (
    <>
      <MetaTags 
        title={post?.title}
        description={post?.excerpt?.replaceAll('<p>', '')?.replaceAll('</p>', '').replaceAll('\n', '')}
        images={post?.image.thumbnail}
      />
      <div className={`blogArticle relative`}>
        <div className="container">
          <BlogArticleBreadcrumb
            breadcrumbs={[
              {id: 1, name: 'Home', href: PATH_PAGE.landing},
              {id: 2, name: 'Blog', href: PATH_PAGE.blog.blog},
              {id: 3, name: post?.title || '', href: PATH_PAGE.blog.view(post?.slug)},
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

