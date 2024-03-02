import Image from 'next/image';
import { PATH_PAGE } from '@/routes/paths';

const projects = [
  { name: 'Museum of Illusions', href: PATH_PAGE.museumOfIllusions, src: '/assets/project/museumOfIllusions/61.webp', width: '900', height: '600' },
  { name: 'Upside Down House', href: PATH_PAGE.upsideDownHouse, src: '/assets/project/upsideDownHouse/134.webp', width: '900', height: '600' },
  { name: 'Giant’s House', href: PATH_PAGE.giantsHouse, src: '/assets/webp/rectangle-10.webp', width: '2100', height: '1200' },
  { name: 'Smash it', href: PATH_PAGE.smashIt, src: '/assets/project/smashIt/103.webp', width: '900', height: '600' },
];

export default function blockProject() {
  return (
    <div className={`blockProject`}>
      <div className="container">
        <div className="flex flex-wrap justify-between">
          {projects.map((item) => (
            <a key={item.name} href={item.href} className="relative blockProject__item">
              <Image
                className="h-full w-full object-cover object-center"
                src={item.src}
                alt="img"
                width={item.width}
                height={item.height}
              />
              <div className="absolute bottom-0 flex items-center justify-between blockProject__item_info">
                <span>{item.name}</span>
                <Image
                  className="blockProject__item_info-Vector"
                  src="/assets/svg/Vector.svg"
                  alt="img"
                  width={61}
                  height={26}
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
