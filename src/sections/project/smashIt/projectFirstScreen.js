import { useState, useRef } from 'react';
import Image from 'next/image';

export default function ProjectFirstScreen() {

  const [isPlaying, setIsPlaying] = useState(false);
  const [isText, setIsText] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    videoRef.current.play();
    setIsPlaying(true);
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
                src="/assets/project/smashIt/103.webp"
                alt="img"
                width={900}
                height={600}
                priority
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
                {isPlaying &&<source type="video/mp4" src="/assets/video/Smash-it1.mp4" />}
              </video>
            </div>
          </div>
          <div className="projectFirst__video_text w50">
            <div className="projectFirst__video_text-title">Smash it!</div>
            <div className="projectFirst__video_text-text">Unleash your inner Hulk and blow off some steam at the &quot;Smash It!&quot; attraction. Tired of feeling bogged down by the world? Write it all down and give it a good smash! Our room is fully equipped with plates and destructible objects for you to decorate and unleash your frustrations upon. Whether you&apos;re still feeling the effects of 2020 or need to let loose, &quot;Smash It!&quot; offers an outlet for all.  </div>
            <div className={`projectFirst__video_text-text`}>Don&apos;t just take our word for it, come experience it for yourself. Just remember, safety first! This attraction is only open to young adults and adults aged 12 and up. So grab a pen, write it down, and let the smashing begin!</div>
            {/*<div className={`projectFirst__video_text-text ${isText}`}>Don&apos;t just take our word for it, come experience it for yourself. Just remember, safety first! This attraction is only open to young adults and adults aged 12 and up. So grab a pen, write it down, and let the smashing begin!</div>*/}
            {/*<button onClick={toggleMore} className={`buttonPurple ${isText}`}>*/}
            {/*  {isText ? 'Hide' : 'Show'} text*/}
            {/*</button>*/}
          </div>
        </div>
      </div>
      
    </div>
  )
}
