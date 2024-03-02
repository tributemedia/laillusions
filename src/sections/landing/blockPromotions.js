import Image from 'next/image';
import Link from 'next/link'

export default function BlockPromotions() {
  return (
    <div className={`blockPromotions`}>
      <div className="container">
        <div className="blockPromotions__content flex flex-wrap justify-between">
          <div className="blockPromotions_duet">
            <Link href="/school-trips" className="relative blockPromotions__item">
              <Image
                className="h-full w-full object-cover object-center "
                src="/assets/webp/promotions1.webp"
                alt="img"
                width={540}
                height={289}
              />
              <Image
                className="h-full w-full object-cover object-center absolute blockPromotions__imgHover"
                src="/assets/webp/promotions1hover.webp"
                alt="img"
                width={540}
                height={289}
              />
              
              <div className="absolute bottom-0 flex items-center justify-center blockPromotions__item_info">
                <span>School Trips</span>
              </div>
            </Link>
            <Link href="/birthdays-parties-events" className="relative blockPromotions__item">
              <Image
                className="h-full w-full object-cover object-center"
                src="/assets/webp/promotions2.webp"
                alt="img"
                width={540}
                height={289}
              />
              <Image
                className="h-full w-full object-cover object-center absolute blockPromotions__imgHover"
                src="/assets/webp/promotions2hover.webp"
                alt="img"
                width={540}
                height={289}
              />
              <div className="absolute bottom-0 flex items-center justify-center blockPromotions__item_info">
                <span>Birthdays, Parties, Events! </span>
              </div>
            </Link>
          </div>
          <Link href="/vip-experience" className="relative blockPromotions__item">
            <Image
              className="h-full w-full object-cover object-center"
              src="/assets/webp/promotions3.webp"
              alt="img"
              width={540}
              height={608}
            />
            <Image
              className="h-full w-full object-cover object-center absolute blockPromotions__imgHover"
              src="/assets/webp/promotions3hover.webp"
              alt="img"
              width={540}
              height={608}
            />
            <div className="absolute bottom-0 flex items-center justify-center blockPromotions__item_info">
              <span>VIP Experience</span>
            </div>
          </Link>
         
        </div>
      </div>
      
    </div>
  )
}
