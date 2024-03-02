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
                src="/assets/webp/rectangle-10.webp"
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
                {isPlaying &&<source type="video/mp4" src="/assets/video/giantsHouse.mov" />}
              </video>
            </div>
          </div>
          <div className="projectFirst__video_text w50">
            <div className="projectFirst__video_text-title">Giant’s House</div>
            <div className="projectFirst__video_text-text">Step into the Giant&apos;s House in Hollywood! Built to scale for giants, this unique house features rooms that are larger than life, with furniture and fixtures that are fit for a giant&apos;s every need. Visitors can explore the place and admire the intricate details that make this attraction special.</div>
            <div className="projectFirst__video_text-text">Have you ever wondered what the world&apos;s most enormous soda can looks like or if you could play with a toy built for King Kong? At the Giant&apos;s House, you&apos;ll finally see what it&apos;s like to be 50 feet tall and experience the world from a new perspective.</div>
            <div className={`projectFirst__video_text-text ${isText}`}>You&apos;ll be amazed at every turn, from the world&apos;s giant pair of shoes to a house built to scale for giants. This attraction is perfect for those with wild imaginations and a love for all things big and bold.<br/><br/>Get ready for a journey into the world of wonder, where the sky&apos;s the limit, and anything is possible. Come and see why the Giant&apos;s House is a must-visit attraction in Los Angeles!</div>
            <button onClick={toggleMore} className={`buttonPurple ${isText}`}>
              {isText ? 'Hide' : 'Show'} text
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
