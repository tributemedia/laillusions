import Image from "next/image";

const socials = [
  { name: 'Facebook', href: 'https://www.facebook.com/MuseumofIllusion', src: '/assets/svg/Facebook.svg', width: '26', height: '26' },
  { name: 'Instagram', href: 'https://www.instagram.com/museumofillusions.usa/', src: '/assets/svg/Instagram.svg', width: '26', height: '26' },
  { name: 'youtube', href: 'https://www.youtube.com/@worldofillusionsusa', src: '/assets/svg/youtube.svg', width: '36', height: '36' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@museumof3dillusions?lang=en', src: '/assets/svg/TikTok.svg', width: '26', height: '26' },
]

export default function BixSocial() {
  return (
    <div className="flex gap-4 items-center justify-start">
      {socials.map((item) => (
        <a key={item.name} href={item.href} className="flex items-center">
          <Image
            src={item.src}
            alt={item.name}
            width={item.width}
            height={item.height}
            priority
          />
        </a>
      ))}
    </div>
  )
}
