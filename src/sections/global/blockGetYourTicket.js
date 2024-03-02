import Image from 'next/image';
import { PATH_PAGE } from "@/routes/paths";

export default function BlockGetYourTicket() {
  return (
    <div className={`blockGetYourTicket flex items-center justify-center`}>
      <div className="absolute blockGetYourTicket__bg">
        <Image
          className="h-full w-full object-cover object-center"
          src="/assets/webp/blockgetyourticket.webp"
          alt="img"
          width={1280}
          height={328}
        />
      </div>
      <div className="blockGetYourTicket__info flex items-center justify-center relative z-8 text-center text-white">
        <p>LET <br/> THE FUN <br/> BEGIN!</p>
        <a
          href={PATH_PAGE.tickets}
          className="buttonYellow"
          onClick={() => {
            window.dataLayer = window.dataLayer || [];
            dataLayer.push({
              'event': 'click_get_your_ticket'
            });
          }}
        >
          Get Your Tickets
        </a>
      </div>
    </div>
  )
}
