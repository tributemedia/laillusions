import { useState } from 'react';

// const accordions = [
//   { id: 1, name: 'Museum of Illusions', text: 'The Museum of Illusions has undergone a massive upgrade to enrich the experience of our visitors! All of the existing 3D artworks have been changed, and an entirely new exhibitions of 3D Illusions has been unveiled to the public!' },
//   { id: 2, name: 'Upside Down House', text: 'Our world famous Museum of Illusions is pleased to announce the newest addition to our lineup of marvels and attractions, The Upside Down House! Featuring 7 interactive upside down rooms: bedroom, bathroom, kitchen, living room, and more! You’ll finally see what it’s like to walk on walls!' },
//   { id: 3, name: 'Giant’s House', text: 'Did we shrink you down to microscopic size or did we expand the world around you into a gigantic one? To answer that we’re pleased to announce the Giant’s House! A gigantic leap forward into the world of wonder. We’re not exaggerating with our newest attraction! ' },
//   { id: 4, name: 'Smash it', text: 'The world has been a stressful place this last year, we thought to ourselves “Let’s help people blow off some steam and have a great time doing it.” We present to you our coming attraction, the Smash It! We could all use a break once in a while and this room offers you just that, literally! ' },
// ];

export default function BlockMaps({title = ''}) {
  const [open, setOpen] = useState(1);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  
  return (
    <div className={`blockMaps`}>
        <div className="blockMaps__items flex flex-wrap justify-start">
          <div className="blockMaps__map">
            <iframe
              loading="lazy"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d98173.12219326901!2d-118.32241143343768!3d34.11317489122872!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bf239e83400f%3A0xdcc8351cdc3d862f!2sWorld%20of%20Illusions%20Los%20Angeles!5e0!3m2!1sen!2sby!4v1692255164240!5m2!1sen!2sby"
              ></iframe>
          </div>
          <div className="blockMaps__info">
            {/*<div className="blockMaps__accordion">*/}
              {/*{accordions.map((item) => (*/}
              {/*  <div key={item.id} className={`blockMaps__accordion_item ${open === item.id}`}>*/}
              {/*    <div className="blockMaps__accordion_item-name flex items-center justify-start" onClick={() => handleOpen(item.id)}><div className="icon"></div>{item.name}</div>*/}
              {/*    <div className="blockMaps__accordion_item-text">{item.text}</div>*/}
              {/*  </div>*/}
              {/*))}*/}
            {/*</div>*/}
            <div className="blockMaps__info_text">
              <h1>{title}</h1>
              Planning a visit to the World of Illusions in Hollywood can be an exciting and unique experience. Located in the heart of the world&apos;s entertainment capital, the museum offers a wide range of interactive and immersive exhibits that are sure to spark your imagination. Before your visit, it is recommended to purchase your tickets online to ensure that you have a guaranteed spot, as the museum can become quite busy. Once you arrive, be sure to bring your camera, as you can take pictures in front of various optical illusions and 3D installations. Take your time exploring each room, and don&apos;t hesitate to ask the staff for recommendations or help to understand the exhibits. The World of Illusions is open seven days a week and offers a fun and educational experience for visitors of all ages.
            </div>
          </div>
        </div>
    </div>
  )
}
