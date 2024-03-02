import Image from 'next/image';
import Slider from 'react-slick';
import { PATH_PAGE } from '@/routes/paths';
import parse from 'html-react-parser';

import uuidv4 from "@/utils/uuidv4";

export default function BlockBlogs({ latest }) {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
      >
        <Image
          className=""
          src="/assets/svg/Go-Right-arrow.svg"
          alt="img"
          width={26}
          height={24}
        />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style }}
        onClick={onClick}
      >
        <Image
          className=""
          src="/assets/svg/Go-Left-arrow.svg"
          alt="img"
          width={26}
          height={24}
        />
      </div>
    );
  }
  
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 1,
        }
      }
    ]
  };
  return (
    <div className={`blockBlogs flex items-center justify-center`}>
      <div className="absolute blockBlogs__bg">
        <Image
          className="h-full w-full object-cover object-center"
          src="/assets/svg/blockBlogs.svg"
          alt="img"
          width={1280}
          height={1200}
        />
      </div>
      <div className="container">
        <div className="blockBlogs__name">
          Blog
        <a href={PATH_PAGE.blog.blog} className="blockBlogs__name_link">Read all posts</a>
        </div>
        <div className="blockBlogs__items ">
          <Slider {...settings}>
            {latest?.map((item) => (
              <div key={item.id} className="blockBlogs__item">
                <div className="blockBlogs__item_bg absolute">
                  <Image
                    className="h-full w-full object-cover object-center blockBlogs__item_img"
                    src={item.image.large || item.image.medium}
                    alt="img"
                    width={350}
                    height={350}
                  />
                </div>
                <div className="blockBlogs__item_info relative">
                  <div className="blockBlogs__item_info-theme">
                    {item?.categories?.map((category) => <span key={uuidv4()}>{category}</span>)}
                    <div className="blockBlogs__item_info-read">5 Min Read</div>
                  </div>
                </div>
                <a href={PATH_PAGE.blog.view(item.slug)} className="blockBlogs__item_info-name">{parse(item.title)}</a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
