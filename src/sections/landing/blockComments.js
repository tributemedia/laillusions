import Image from 'next/image';
import Slider from 'react-slick';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

const comments = [
  { name: 'By Teresa J', city: 'Los Angeles', src: '/assets/webp/11.png', text: 'Took the kids here and opted for the Big house and the upside down one too and paid for the VIP package for the girls. It was well worth the price and we spent about 2 hours there just playing around and trying to come up with fun poses' },
  { name: 'By Seng Vang', city: 'Los Angeles', src: '/assets/webp/22.png', text: 'We had such a blast at the Museum of Illusions. The staff was super nice and took us to the rooms to show us how to pose and where to scan the code so it will show us other people\'s pictures for examples to pose also. They even offered to take our pictures for us too. I definitely recommend this place' },
  { name: 'By Kelly Branyik', city: 'Los Angeles', src: '/assets/webp/33.png', text: 'We came here for bachelorette weekend photos and had a great time. The Silver package was great and we were paired up with Sehun and he was so sweet and went over the top to make sure we had a good time. The staff helped us get into our reservation a bit early because we scheduled on the wrong day by accident. Overall awesome experience! I highly recommend it!' },
  { name: 'By Ling Wang', city: 'Los Angeles', src: '/assets/webp/44.png', text: 'IT WAS SO FUN!!! The paintings on the walls were literally amazing. This experience was worth it. We had so much fun taking pictures and being in the upside down house and giant house!' },
  { name: 'By Breezy Calloway', city: 'Los Angeles', src: '/assets/webp/55.png', text: 'Pretty cool experience, they offer tripods so you can take pics of yourself/be your own photographer. There are also camera indicators on the ground that show you exactly where to place the tripod and examples on the wall that show where to stand/pose to capture the pic at the perfect angle. Results in some cool pics!' },
];


export default function BlockComments() {

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
    dots: true,
    variableWidth: true,
    slidesToScroll: 1,
    centerPadding: '0',
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };
  return (
    <div className={`blockComments ${inter.className}`}>
      <div className="container">
        <div className="blockComments__content">
          <Slider {...settings}>
            {comments.map((item) => (
              <div key={item.name} className="blockComments__item">
                <Image
                  className="absolute blockComments__item_imgDots"
                  src="/assets/svg/dots.svg"
                  alt="img"
                  width={64}
                  height={46}
                />
                <div className="blockComments__item_text">{item.text}</div>
                <Image
                  className="h-full w-full object-cover object-center blockComments__item_img"
                  src={item.src}
                  alt="img"
                  width={160}
                  height={160}
                />
                <div className="blockComments__item_name">{item.name}</div>
                <div className="blockComments__item_city">{item.city}</div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}
