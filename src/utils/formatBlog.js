export const formatPost = (post) => {
  const author = post?._embedded.author[0];
  const image = post?._embedded['wp:featuredmedia'][0].media_details.sizes;
  const categories = post?._embedded['wp:term'][0].map((item) => item.name);
  return {
    id: post?.id,
    date: post?.date,
    modified: post?.modified,
    slug: post?.slug,
    title: post?.title?.rendered,
    excerpt: post?.excerpt?.rendered,
    content: post?.content?.rendered,
    author: {
      id: author?.id,
      name: author?.name,
      avatar: author?.avatar_urls[96],
    },
    image: {
      medium: image?.medium?.source_url || null,
      large: image?.large?.source_url || null,
      thumbnail: image?.woocommerce_thumbnail?.source_url || null,
    },
    categories
  }
}

export const formatCategory = (category) => {
  return {
    id: category.id,
    count: category.count,
    name: category.name,
    slug: category.slug,
  }
}

export const formatComment = (comment) => {
  return {
    id: comment.id,
    name: comment.author_name,
    site: comment.author_url,
    date: comment.date,
    avatar: comment.author_avatar_urls[48],
    content: comment.content.rendered
  }
}

