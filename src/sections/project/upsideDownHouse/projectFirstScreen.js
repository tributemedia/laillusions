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
                src="/assets/project/upsideDownHouse/134.webp"
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
                {isPlaying &&<source type="video/mp4" src="/assets/video/video-header.mp4" />}
              </video>
            </div>
          </div>
          <div className="projectFirst__video_text w50">
            <div className="projectFirst__video_text-title">UPSIDE DOWN HOUSE</div>
            <div className="projectFirst__video_text-text">Get ready to turn your world upside down at the World of Illusions&apos; newest addition – The Upside Down House! With seven interactive rooms that are completely upside down, you&apos;ll finally get to experience what it&apos;s like to walk on walls and dance on the ceiling and see the world from a different perspective.</div>
            <div className="projectFirst__video_text-text">As you walk through the house, you&apos;ll be able to explore rooms turned entirely upside down, from the furniture to the light fixtures. This unusual attraction provides a fun and interactive experience for visitors of all ages. </div>
            <div className={`projectFirst__video_text-text ${isText}`}>Whether you&apos;re looking for a fun day out with the family or an unusual date idea, the Upside Down House in Hollywood is the perfect place to visit. So why not plan your trip today and experience the world from an entirely new perspective?</div>
            <button onClick={toggleMore} className={`buttonPurple ${isText}`}>
              {isText ? 'Hide' : 'Show'} text
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}
