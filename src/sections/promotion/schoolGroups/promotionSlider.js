import Slider from 'react-slick';
import Image from 'next/image';

const promotions = [
  {id: 1, srs: '/assets/promotion/schoolGroups/21.webp', text: 'Is that a giant toy or a tiny you?'},
  {id: 2, srs: '/assets/promotion/schoolGroups/31.webp', text: 'Let your imagination run wild.'},
  {id: 3, srs: '/assets/promotion/schoolGroups/41.webp', text: 'Living life on the flip side.'},
  {id: 4, srs: '/assets/promotion/schoolGroups/51.webp', text: 'See the world from a giant\'s point of view!'},
];

export default function PromotionSlider() {
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
        breakpoint: 767,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 1,
          // centerMode: true,
        }
      }
    ]
  };

  return (
    <div className={`relative promotionSlider`}>
      <div className="promotionSlider__desktop">
        <div className="flex items-start justify-between">
          {promotions.map((item) => (
            <div key={item.id} className="item">
              <Image
                className="item__img h-full w-full object-cover object-center"
                src={item.srs}
                alt="img"
                width={300}
                height={300}
                priority
              />
              <div className="item__text">{item.text}</div>
            </div>
          ))}
        </div>
        {/*<div className="promotionSlider__desktop_show">*/}
        {/*  <Image*/}
        {/*    src="/assets/svg/arrows-next.svg"*/}
        {/*    alt="img"*/}
        {/*    width={30}*/}
        {/*    height={28}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
      <div className="promotionSlider__tablet">
        <Slider {...settings}>
          {promotions.map((item) => (
            <div key={item.id} className="item">
              <Image
                className="item__img h-full w-full object-cover object-center"
                src={item.srs}
                alt="img"
                width={220}
                height={220}
                priority
              />
              <div className="item__text">{item.text}</div>
            </div>
          ))}
        </Slider>
      </div>

    </div>
  )
}
