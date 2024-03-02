import React, { useState } from "react";
// next
import Image from 'next/image';
// components
import parse from 'html-react-parser';
import Loading from "@/components/Loading";
// routers
import { PATH_PAGE } from '@/routes/paths';
// services
import BlogApiService from "@/services/blog";
// utils
import uuidv4 from "@/utils/uuidv4";


const BlogPosts = ({ posts, ...other }) => {
  const [page, setPage] = useState(1);
  const [list, setList] = useState(posts);
  const [loading, setLoading] = useState(false);
  
  const loadPosts = async () => {
    setLoading(true)
    await BlogApiService.getBlogData({ page: page + 1, per_page: 10 })
      .then((res) => {
        setList([...list, ...res.posts]);
        setLoading(false);
      });
    setPage(page + 1);
  };

  return (
    <div className={`blogPosts`}>
      <div className="container">
        <div className="blogPosts__items">
          {list.map((item) => (
            <div key={item.id} className="blogPosts__item">
              <div className="blogPosts__item_img" key={uuidv4()}>
                <a href={PATH_PAGE.blog.view(item?.slug)}>
                  <Image
                    className="object-cover object-center"
                    placeholder="blur"
                    priority
                    src={item.image.large || item.image.medium}
                    alt="img"
                    width={540}
                    height={386}
                  />
                </a>
              </div>
              <div className="blogPosts__item__info">
                <div className="blogPosts__item__info-user flex items-center">
                    <div className="blogPosts__user flex items-center">
                      <Image
                        className="object-cover object-center blogPosts__user_img"
                        src={item?.author.avatar}
                        alt="img"
                        width={30}
                        height={30}
                      />
                      <div className="blogPosts__user_name">{item.author.name}</div>
                    </div>

                  <div className="blogPosts__read">5 min read</div>
                </div>
                <a href={PATH_PAGE.blog.view(item?.slug)} className="blogPosts__item__info-name">{parse(item.title)}</a>
                <div className="blogPosts__item__info-text">{parse(item.excerpt)}</div>
                <div className="blogPosts__item__info-theme">
                  {item?.categories?.map((category) => <span key={uuidv4()}>{category}</span>)}
                </div>
              </div>
            </div>
            ))}
        </div>
        {Number(page) !== Number(other?.pages) && (
          <div onClick={loadPosts} className="buttonPurple relative">
            {loading ? (
              <Loading loading={loading}/>
            ) : (
              'Load more'
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPosts;