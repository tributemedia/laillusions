import React, {useEffect} from 'react';
import Image from 'next/image';
// import dynamic from 'next/dynamic';

import parse from 'html-react-parser';

import uuidv4 from "@/utils/uuidv4";

import BlockProject from '../global/blockProject';

// const BlockProject = dynamic(() => import('../global/blockProject'), { ssr: false });

export default function BlogArticleContent({
  title,
  content,
  image,
  author,
  categories
}) {

  useEffect(() => {
    let faqs = [];
    faqs = document.getElementsByClassName('faq__item');
    for (let i = 0; i < faqs.length; i++){
      //console.log('i',i, faqs[i]);
      let headFaq = faqs[i].getElementsByClassName('faq__item-header')[0];
      if (headFaq){
        headFaq.onclick =  function (event) {
          faqs[i].classList.toggle("active");
        };
      }
    }
  }, [content])
  
  return (
    <div className="container__mini">
      <div className="blogArticle__content">
        <Image
          className="object-cover object-center blogArticle__content_img"
          src={image?.large || image?.thumbnail}
          alt="img"
          width={920}
          height={470}
        />
        <div className="blogArticle__content_info">
          <div className="blogArticle__about flex items-center">
            <Image
              className="object-cover object-center blogArticle__about_img"
              src={author?.avatar || "/assets/blogUser.png"}
              alt="img"
              width={30}
              height={30}
              placeholder="blur"
              priority
            />
            <div className="blogArticle__about_name">{author?.name}</div>
            <div className="blogArticle__about_read">5 min read</div>
            <div className="blogArticle__about_theme">
              {categories?.map((item) => <span key={uuidv4()}>{item}</span>)}
            </div>
          </div>
          <div className="title">{title}</div>
          <div className="text">
            {content && parse(content)}
          </div>

          <BlockProject />

        </div>
      </div>
    </div>
  )
}