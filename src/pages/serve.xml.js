// pages/sitemap.xml.js

// import { getSortedPostsData } from "../lib/posts";

import BlogApiService from "@/services/blog";

const URL = "https://laillusions.com";

function generateSiteMap(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
     ${posts
    .map(({ slug }) => {
      return `
           <url>
               <loc>${`${URL}/blog/${slug}`}</loc>
           </url>
         `;
    })
    .join("")}
   </urlset>
 `;
}

export async function getServerSideProps({ res }) {
  const { posts, total, pages } = await BlogApiService.getBlogData({ per_page: 100 });

  console.log(total, pages);
  // Generate the XML sitemap with the blog data
  const sitemap = generateSiteMap(posts);

  res.setHeader("Content-Type", "text/xml");
  // Send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function SiteMap() {}
