import Image from 'next/image';
import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import Slider from 'react-slick';
import React from "@types/react";

const projectSliders = [
  {id: 3, src: '/assets/project/museumOfIllusions/31.webp'},
  {id: 5, src: '/assets/project/museumOfIllusions/51.webp'},
  {id: 6, src: '/assets/project/museumOfIllusions/61.webp'},
  {id: 8, src: '/assets/project/museumOfIllusions/81.webp'},
  {id: 9, src: '/assets/project/museumOfIllusions/91.webp'},
  {id: 10, src: '/assets/project/museumOfIllusions/101.webp'},
  {id: 11, src: '/assets/project/museumOfIllusions/111.webp'},
  {id: 15, src: '/assets/project/museumOfIllusions/151.webp'},
  {id: 16, src: '/assets/project/museumOfIllusions/161.webp'},
  {id: 17, src: '/assets/project/museumOfIllusions/171.webp'},
  {id: 18, src: '/assets/project/museumOfIllusions/181.webp'},
  {id: 20, src: '/assets/project/museumOfIllusions/201.webp'},
  {id: 21, src: '/assets/project/museumOfIllusions/211.webp'},
]

export default function ProjectSlider() {
  const [open, setOpen] = useState(false);
  const [openImg, setOpenImg] = useState(0);

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


  const handleOpen = (value) => {
    setOpen(true);
    setOpenImg(openImg === value ? 0 : value);
  };
  
  const handleClose = () => {
    setOpen(false);
    setOpenImg(0);
  };

  const settingsNav = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    swipe: false,
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
          slidesToShow: 1
        }
      }
    ]
  };
  
  return (
    <div className={`projectSlider flex items-center justify-center`}>
      <div className="container">
        <div className="projectSlider__items ">
          <Slider {...settingsNav}>
            {projectSliders.map((item) => (
              <div key={item.id} onClick={() => handleOpen(item.id)} className="projectSlider__item relative">
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
        </div>
      </div>
      
      <Transition.Root onClick={() => handleClose()} show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity md:block" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 overflow-y-auto">
            <div className="flex min-h-full justify-center text-center items-center px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex transform text-left text-base transition md:my-8 md:px-4 ">
                  <div className="relative flex w-full items-center overflow-hidden">
                    <button
                      type="button"
                      className="buttonCloseModal"
                      onClick={() => handleClose()}
                    >
                      <span className=""><svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg></span>
                    </button>
                    <div>
                      {projectSliders.map((item) => (
                        <div key={item.id} className={`projectSlider__open ${openImg === item.id}`}>
                          <Image
                            className="h-full w-full object-cover object-center projectSlider__item_img"
                            src={item.src}
                            alt="img"
                            width={800}
                            height={800}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}
