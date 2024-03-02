import Image from 'next/image';
import { Inter } from 'next/font/google';
import BixSocial from '@/components/bixSocial';
const inter = Inter({ subsets: ['latin'] });
import { PATH_PAGE } from '@/routes/paths';
import { fDate } from "@/utils/formatTime";

const projects = [
  {name: 'Museum of Illusions', href: PATH_PAGE.museumOfIllusions},
  {name: 'Upside Down House', href: PATH_PAGE.upsideDownHouse},
  {name: 'Giant’s House', href: PATH_PAGE.giantsHouse},
  {name: 'Smash it', href: PATH_PAGE.smashIt},
];

const promotions = [
  {name: 'School Trips', href: PATH_PAGE.schoolGroups},
  {name: 'Birthdays, Parties, Events!', href: PATH_PAGE.events},
  {name: 'VIP Experience', href: PATH_PAGE.experience},
];

export default function Footer() {
  return (
    <footer className={`footer ${inter.className}`}>
      <div className="container">
        <div className="footer__items flex items-start justify-between">
         <div className="flex ">
           <a href={PATH_PAGE.landing} className="">
             <Image
               className=""
               src="/logo/logo.svg"
               alt="img"
               width={140}
               height={35}
               priority
             />
           </a>
         </div>
         <div className="flex ">
           <p className="footer__items_name">Projects</p>
           {projects.map((item) => (
             <a key={item.name} href={item.href} className="footer__items_link">{item.name}</a>
           ))}
         </div>
          <div className="flex ">
            <p className="footer__items_name">Promotions</p>
            {promotions.map((item) => (
              <a key={item.name} href={item.href} className="footer__items_link">{item.name}</a>
            ))}
          </div>
          <div className="flex ">
            <a href={PATH_PAGE.blog.blog} className="footer__items_name">Blog</a>
            <a href="https://squareup.com/gift/JJA9MMF48X3DJ/order" target="_blank" className="footer__items_name">Gift Cards</a>
            <a
              href={PATH_PAGE.tickets}
              onClick={() => {
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                  'event': 'click_tickets'
                });
               }}
              className="footer__items_name"
            >
              Tickets
            </a>
            <a href={PATH_PAGE.privacyPolicy} className="footer__items_name">Privacy Policy</a>
            <a href={PATH_PAGE.termsAndConditions} className="footer__items_name">Terms And Conditions</a>
          </div>
          <div className="flex ">
            <p className="footer__items_text">World of Illusions 6751 Hollywood Blvd,
              Los Angeles, CA 90028</p>
            <a href="tel:8005932902" className="footer__items_text font-bold tell">(800) 593-2902</a>
            <a href="mailto:infola@bigfunnyusa.com" className="footer__items_text">infola@bigfunnyusa.com</a>
            <form action="//squareup.com/outreach/NdlUYo/subscribe" method="POST" target="_blank">
              <div className="relative flex footer__subscribe">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email_address"
                  type="email"
                  autoComplete="email"
                  required
                  className="footer__subscribe_input flex-auto "
                  placeholder="Enter your email"
                />
                <button
                  type="submit"
                  className="flex-none footer__subscribe_button buttonPurple absolute"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          
        </div>
        <div className="footer__items_social flex items-end justify-start">
          <BixSocial />
          <p className="footer__items_text">{fDate(Date.now(), "yyyy")} © Museum of 3D Illusions</p>
        </div>
      </div>
    </footer>
  )
}
