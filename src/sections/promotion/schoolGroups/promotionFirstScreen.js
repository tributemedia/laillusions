import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';
import dynamic from "next/dynamic";
import QuoteForm from "@/sections/promotion/QuoteForm";
const PromotionSlider = dynamic(() => import('../schoolGroups/promotionSlider'), { ssr: false });

export default function PromotionFirstScreen() {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative promotionFirstScreen flex`}>
      <div className="container">
        <div className="promotionFirstScreen__top flex">
          <div className="promotionFirstScreen__top_img">
            <Image
              className="h-full w-full object-cover object-center"
              src="/assets/promotion/schoolGroups/1.webp"
              alt="img"
              width={540}
              height={540}
              priority
            />
          </div>
          <div className="promotionFirstScreen__top_text">
            <div className="promotionFirstScreen__top_text-title">School Trips</div>
            <div className="promotionFirstScreen__top_text-text">
              Step into a world of wonder and enchantment at the World of Illusions! We&apos;ve designed the perfect field trip experience for School Trips that combines education and fun. Immerse yourself in the magic of illusions and learn about the science of perception and the art of perspective. This interactive experience is sure to captivate and inspire young minds, creating memories that will last a lifetime. So why wait? Contact us to book your trip and give your students the gift of a truly unforgettable experience.
            </div>
            <a onClick={() => setOpen(true)} className="buttonYellow">
              Get Quote
            </a>
          </div>
        </div>
        <PromotionSlider />
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
                <Dialog.Panel className="flex transform text-left text-base transition md:my-8 md:max-w-2xl px-4 lg:max-w-4xl">
                  <div className="relative flex items-center overflow-hidden  ">
                    <button
                      type="button"
                      className="buttonCloseModal"
                      onClick={() => setOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                    </button>

                    <QuoteForm />
                    
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
