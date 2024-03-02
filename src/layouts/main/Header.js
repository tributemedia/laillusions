import { useRouter } from 'next/router';
import { useState, useEffect, Fragment } from 'react';
import Image from 'next/image';
import { Dialog, Menu, Transition } from '@headlessui/react';
import BixSocial from "@/components/bixSocial";
import { PATH_PAGE } from '@/routes/paths';
import { gtmPush } from "@/utils/gtmPush";
import { fbq } from "@/utils/fbqMeta";

const projects = [
  { name: 'Museum of Illusions', href: PATH_PAGE.museumOfIllusions },
  { name: 'Upside Down House', href: PATH_PAGE.upsideDownHouse },
  { name: 'Giant’s House', href: PATH_PAGE.giantsHouse },
  { name: 'Smash it', href: PATH_PAGE.smashIt },
];

const promotions = [
  { name: 'School Trips', href: PATH_PAGE.schoolGroups },
  { name: 'Birthdays, Parties, Events!', href: PATH_PAGE.events },
  { name: 'VIP Experience', href: PATH_PAGE.experience },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [offset, setOffset] = useState(0);
  const router = useRouter();
  // const currentPath = window.location.pathname;
  
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  let width = window.innerWidth <= 767 ? 20 : 74;
  const scroll = offset > width && 'scroll';

  const bgHeader = [
    PATH_PAGE.museumOfIllusions,
    PATH_PAGE.upsideDownHouse,
    PATH_PAGE.giantsHouse,
    PATH_PAGE.smashIt,
    PATH_PAGE.view(router.query?.slug),
    PATH_PAGE.blog.view(router.query?.slug)].includes(router.asPath)
  return (
    <header
      className={`fixed flex items-center inset-x-0 top-0 z-10 header ${scroll} ${bgHeader}`}>
      <div className="container">
        <nav className="flex items-center justify-between" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href={PATH_PAGE.landing} className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                className=""
                src="/logo/logo.svg"
                alt="img"
                width={190}
                height={48}
                priority
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <div className="header__openMenu">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 header__menu">
            <Menu as="div" className="relative inline-block">
              <div>
                <Menu.Button className="header__menu_link flex items-center text-white">
                  Projects
                  <Image
                    className=""
                    src="/assets/svg/arrow.svg"
                    alt="arrow"
                    width={18}
                    height={10}
                    priority
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="header__menu_open absolute right-0 z-10  origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {projects.map((item) => (
                      <Menu.Item key={item.name}>
                        {({active}) => (
                          <a href={item.href}
                             className={classNames(active ? ' text-gray-900' : 'text-gray-700', 'block')}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <a href={PATH_PAGE.blog.blog} className="header__menu_link text-white">
              Blog
            </a>
            <a href="https://squareup.com/gift/JJA9MMF48X3DJ/order" target="_blank" className="header__menu_link text-white">
              Gift Cards
            </a>
            <Menu as="div" className="relative inline-block">
              <div>
                <Menu.Button className="header__menu_link flex items-center text-white">
                  Promotions
                  <Image
                    className=""
                    src="/assets/svg/arrow.svg"
                    alt="arrow"
                    width={18}
                    height={10}
                    priority
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className="header__menu_open absolute right-0 z-10  origin-top-right  bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {promotions.map((item) => (
                      <Menu.Item key={item.name}>
                        {({active}) => (
                          <a href={item.href}
                             className={classNames(active ? ' text-gray-900' : 'text-gray-700', 'block')}
                          >
                            {item.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href={PATH_PAGE.tickets}
              onClick={() => {
                gtmPush({
                  'event': 'click_tickets'
                });
                fbq('track', 'click_tickets');
              }}
              className="header__menu buttonYellow"
            >
              Tickets
            </a>
          </div>
        </nav>
      </div>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0 z-20"/>
        <Dialog.Panel
          className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto header__mobile sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="container">
            <div className="flex items-center justify-between">
              <a href={PATH_PAGE.landing} className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className=""
                  src="/logo/logo.svg"
                  alt="img"
                  width={190}
                  height={48}
                  priority
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <div className="header__openMenu close">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </button>
            </div>


            <div className="header__mobile_links">
              <Menu as="div" className="relative inline-block">
                <div>
                  <Menu.Button className="header__menu_link flex items-center text-white">
                    Projects
                    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.35218 1.30592C1.57776 1.11004 1.88366 1 2.20262 1C2.52157 1 2.82747 1.11004 3.05305 1.30592L9.00726 6.47795L14.9615 1.30592C15.1883 1.11559 15.4922 1.01027 15.8076 1.01266C16.123 1.01504 16.4247 1.12492 16.6477 1.31865C16.8707 1.51237 16.9972 1.77443 17 2.04839C17.0027 2.32235 16.8815 2.58628 16.6623 2.78334L9.85769 8.69408C9.63212 8.88996 9.32622 9 9.00726 9C8.6883 9 8.3824 8.88996 8.15683 8.69408L1.35218 2.78334C1.12668 2.5874 1 2.32169 1 2.04463C1 1.76757 1.12668 1.50186 1.35218 1.30592Z" fill="white" stroke="white"/>
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="focus:outline-none">
                    <div className="py-1">
                      {projects.map((item) => (
                        <Menu.Item key={item.name}>
                          {({active}) => (
                            <a href={item.href}
                               className="block header__menu_link-open"
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <a href={PATH_PAGE.blog.blog} className="header__menu_link text-white">
                Blog
              </a>
              <a href="https://squareup.com/gift/JJA9MMF48X3DJ/order" target="_blank" className="header__menu_link text-white">
                Gift Cards
              </a>
              <Menu as="div" className="relative inline-block">
                <div>
                  <Menu.Button className="header__menu_link flex items-center text-white">
                    Promotions
                    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.35218 1.30592C1.57776 1.11004 1.88366 1 2.20262 1C2.52157 1 2.82747 1.11004 3.05305 1.30592L9.00726 6.47795L14.9615 1.30592C15.1883 1.11559 15.4922 1.01027 15.8076 1.01266C16.123 1.01504 16.4247 1.12492 16.6477 1.31865C16.8707 1.51237 16.9972 1.77443 17 2.04839C17.0027 2.32235 16.8815 2.58628 16.6623 2.78334L9.85769 8.69408C9.63212 8.88996 9.32622 9 9.00726 9C8.6883 9 8.3824 8.88996 8.15683 8.69408L1.35218 2.78334C1.12668 2.5874 1 2.32169 1 2.04463C1 1.76757 1.12668 1.50186 1.35218 1.30592Z" fill="white" stroke="white"/>
                    </svg>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    className="focus:outline-none">
                    <div className="py-1">
                      {promotions.map((item) => (
                        <Menu.Item key={item.name}>
                          {({active}) => (
                            <a href={item.href}
                               className="block header__menu_link-open"
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <a
              href={PATH_PAGE.tickets}
              className="header__mobile_ticket buttonYellow"
              onClick={() => {
                gtmPush({
                  'event': 'click_tickets'
                });
                fbq('track', 'click_tickets');
              }}
            >
              Tickets
            </a>
            <div className="BixSocial">
              <BixSocial />
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
