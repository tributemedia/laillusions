import React, {Component} from "react";
import Image from 'next/image';
import Slider from 'react-slick';

const projectSliders = [
  { id: 9, src: '/assets/project/smashIt/93.webp' },
  { id: 6, src: '/assets/project/smashIt/63.webp' },
  { id: 7, src: '/assets/project/smashIt/73.webp' },
  { id: 1, src: '/assets/project/smashIt/13.webp' },
  { id: 8, src: '/assets/project/smashIt/83.webp' },
  { id: 2, src: '/assets/project/smashIt/23.webp' },
  { id: 3, src: '/assets/project/smashIt/33.webp' },
  { id: 5, src: '/assets/project/smashIt/53.webp' },
];

const settingsNav = {
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  swipe: false,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>,
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
        slidesToShow: 1
      }
    }
  ]
};
const settingsModal = {
  arrows: true,
  nextArrow: <SampleNextArrow/>,
  prevArrow: <SamplePrevArrow/>,
  responsive: [
    {
      breakpoint: 1023,
      settings: {
        arrows: false,
        dots: false,
      }
    }
  ]
};

function SampleNextArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{...style}}
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
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{...style}}
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

const handleOpen = () => {
  const element = document.getElementById("sliderModal");
  element.classList.add("open");
};

const handleClose = () => {
  const element = document.getElementById("sliderModal");
  element.classList.remove("open");
};


export default class AsNavFor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }


  render() {

    return (
      <div>
        <div className={`projectSlider flex items-center justify-center`}>
          <div className="container">
            <div className="projectSlider__items ">
              <Slider
                asNavFor={this.state.nav1}
                ref={slider => (this.slider2 = slider)}
                swipeToSlide={true}
                focusOnSelect={true}
                {...settingsNav}
              >
                {projectSliders.map((item) => (
                  <div key={item.id} onClick={() => handleOpen()} className="projectSlider__item relative">
                    <Image
                      className="h-full w-full object-cover object-center projectSlider__item_img"
                      src={item.src}
                      alt="img"
                      width={350}
                      height={350}
                      priority
                    />
                  </div>
                ))}
              </Slider>

              <div id="sliderModal" className="sliderModal ">
                <div className="sliderModal__content ">
                  <button
                    type="button"
                    className="buttonCloseModal"
                    onClick={() => handleClose()}
                  >
                    <span className=""><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg></span>
                  </button>
                  <div className="sliderModal__content_item relative">
                    <Slider
                      asNavFor={this.state.nav2}
                      ref={slider => (this.slider1 = slider)}
                      {...settingsModal}
                    >
                      {projectSliders.map((item) => (
                        <div key={item.id} className="sliderModal__content_item relative">
                          <Image
                            className="h-full w-full object-cover object-center sliderModal__content_item-img"
                            src={item.src}
                            alt="img"
                            width={700}
                            height={500}
                            priority
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}