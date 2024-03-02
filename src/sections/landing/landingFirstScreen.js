import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import BixSocial from '@/components/bixSocial';
import { PATH_PAGE } from '@/routes/paths';
import { gtmPush } from "@/utils/gtmPush";
import { fbq } from "@/utils/fbqMeta";

export default function LandingFirstScreen() {
  const [open, setOpen] = useState(false)
  
  return (
    <div className={`relative min-h-screen FirstScreen flex`}>
      <div
        className="absolute FirstScreen_bg -z-1 overflow-hidden "
        aria-hidden="true"
      >
        <Image
          className="h-full w-full object-cover object-center"
          src="/assets/webp/imgFirstScreen1.webp"
          alt="img"
          width={5111}
          height={3333}
          priority
        />
      </div>
      <div className="container mx-auto relative z-9 flex items-center">
        <div className="FirstScreen__text w50 text-white">
          <p className="uppercase relative">
            the most <br />
            fun Museum
            <Image
              className="absolute FirstScreen__text_spark"
              src="/assets/webp/spark.webp"
              alt="img"
              width={85}
              height={81}
              priority
            />
          </p>
          <div>in <span className="colorYellow">Los Angeles</span></div>
        </div>
        <div className="w50 FirstScreen__info pl-4">
          <p className="mb-6 text-lg leading-8 text-white">
            Step into Hollywood’s famous World of Illusions with 4 unique experiences that you’ll be sure to baffle your friends with! Our Museum of Illusions, Giant’s House, Upside Down House, and Smash It will transport you to a world of fantasy and imagination!
          </p>
          <div className="flex items-center justify-between">
            <a
              href={PATH_PAGE.tickets}
              className="buttonPurple neon"
              onClick={() => {
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                  'event': 'click_get_your_ticket'
                });
              }}
            >
              Get Your Tickets
            </a>
            <a
              onClick={() => {
                setOpen(true);
                gtmPush({
                  'event': 'click_watch_video'
                });
                fbq('track', 'click_watch_video');
              }}
              className="flex items-center text-white buttonVideo"
            >
              <Image
                className="buttonVideo__icon"
                src="/assets/svg/video.svg"
                alt="img"
                width={65}
                height={50}
                priority
              />
              Watch video
            </a>
          </div>
        </div>
        <div className="FirstScreen__socials absolute">
          <BixSocial />
        </div>
      </div>
      
      

      <Transition.Root show={open} as={Fragment}>
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

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full justify-center text-center items-center md:px-2 lg:px-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                enterTo="opacity-100 translate-y-0 md:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 md:scale-100"
                leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              >
                <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                  <div className="relative flex w-full items-center overflow-hidden  shadow-2xl ">
                    <button
                      type="button"
                      className="buttonCloseModal"
                      onClick={() => setOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                    </button>

                    <video className="FirstScreen_video" controls="controls">
                      <source type="video/mp4" src="/assets/video/LARAMUSUEM.mov" />
                    </video>
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
