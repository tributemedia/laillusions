import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProjectFirstScreen() {
  // const [open, setOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isText, setIsText] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(true);
    setTimeout(() => {
      videoRef?.current?.play();
    }, 1000);
  };
  
  const toggleMore = () => {
    setIsText(!isText);
  };
  
  return (
    <div className={`relative projectFirst flex`}>
      <div className="container">
        <div className="projectFirst__video flex ">
          <div className=" w50 relative">
            <div className={`projectFirst__video_img relative ${isPlaying && "pause"}` }>
              <Image
                className="h-full w-full object-cover object-center absolute video_img"
                src="/assets/project/museumOfIllusions/61.webp"
                alt="img"
                width={900}
                height={600}
                priority
                loading="eager"
              />
              {/*<a onClick={() => setOpen(true)} className="flex items-center text-white buttonVideo">*/}
              {/*  <Image*/}
              {/*    className="buttonVideo__icon"*/}
              {/*    src="/assets/svg/video.svg"*/}
              {/*    alt="img"*/}
              {/*    width={65}*/}
              {/*    height={50}*/}
              {/*    priority*/}
              {/*  />*/}
              {/*</a>*/}
              <a onClick={togglePlay} className="flex items-center text-white buttonVideo">
                <Image
                  className="buttonVideo__icon"
                  src="/assets/svg/play.svg"
                  alt="img"
                  width={65}
                  height={65}
                  priority
                />
              </a>
               <video ref={videoRef} className="FirstScreen_video" controls={isPlaying}>
                 {isPlaying &&<source type="video/mp4" src="/assets/video/museumOfIllusions.mp4" />}
              </video>
            </div>
          </div>
          <div className="projectFirst__video_text w50">
            <div className="projectFirst__video_text-title">Museum of Illusions</div>
            <div className="projectFirst__video_text-text">Step into a world of magic and mystery at the upgraded Museum of Illusions in Hollywood! With an entirely new collection of 3D illusions, your visit will be more immersive, sharp, and captivating than ever before.</div>
            <div className="projectFirst__video_text-text">Get ready to embark on an African Safari, rock the stage with some of the music industry&apos;s most incredible acts, walk the edge of a skyscraper in a daring escape, steal treasure from a fearsome dragon, and walk the red carpet at a Hollywood film premiere – all in one visit! With the help of top artists from around the world, the museum has been transformed into an extraordinary experience that will leave you breathless.</div>
            <div className={`projectFirst__video_text-text ${isText}`}>So why wait? Grab your tickets now and be ready to be transported to a world of illusion, where anything is possible, and the impossible becomes a reality. Get ready to see everything with your own eyes and discover why the Museum of Illusions in Hollywood is a must-visit destination. Don&apos;t miss out on this incredible opportunity to be mesmerized and entertained!</div>
            <button onClick={toggleMore} className={`buttonPurple ${isText}`}>
             {isText ? 'Hide' : 'Show'} text
            </button>
          </div>
        </div>
      </div>
      {/*<Transition.Root show={open} as={Fragment}>*/}
      {/*  <Dialog as="div" className="relative z-10" onClose={setOpen}>*/}
      {/*    <Transition.Child*/}
      {/*      as={Fragment}*/}
      {/*      enter="ease-out duration-300"*/}
      {/*      enterFrom="opacity-0"*/}
      {/*      enterTo="opacity-100"*/}
      {/*      leave="ease-in duration-200"*/}
      {/*      leaveFrom="opacity-100"*/}
      {/*      leaveTo="opacity-0"*/}
      {/*    >*/}
      {/*      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />*/}
      {/*    </Transition.Child>*/}
      
      {/*    <div className="fixed inset-0 z-10 overflow-y-auto">*/}
      {/*      <div className="flex min-h-full justify-center text-center items-center md:px-2 lg:px-4">*/}
      {/*        <Transition.Child*/}
      {/*          as={Fragment}*/}
      {/*          enter="ease-out duration-300"*/}
      {/*          enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"*/}
      {/*          enterTo="opacity-100 translate-y-0 md:scale-100"*/}
      {/*          leave="ease-in duration-200"*/}
      {/*          leaveFrom="opacity-100 translate-y-0 md:scale-100"*/}
      {/*          leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"*/}
      {/*        >*/}
      {/*          <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">*/}
      {/*            <div className="relative flex w-full items-center overflow-hidden  shadow-2xl ">*/}
      {/*              <button*/}
      {/*                type="button"*/}
      {/*                className="buttonCloseModal"*/}
      {/*                onClick={() => setOpen(false)}*/}
      {/*              >*/}
      {/*                X*/}
      {/*              </button>*/}
      {/*          */}
      {/*              <video className="FirstScreen_video" controls="controls">*/}
      {/*                <source type="video/mp4" src="/assets/video/video-header.mp4" />*/}
      {/*              </video>*/}
      {/*            </div>*/}
      {/*          </Dialog.Panel>*/}
      {/*        </Transition.Child>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </Dialog>*/}
      {/*</Transition.Root>*/}
      
    </div>
  )
}
