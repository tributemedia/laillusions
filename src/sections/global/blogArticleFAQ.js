import { useState } from 'react';

const FAQs = [
  { id: 1, name: 'Do I need to print the tickets out or can I just pull them up on my phone?', text: 'You do not need to print the tickets. You call pull them up on your phone.' },
  { id: 2, name: 'What are the museum\'s working hours?', text: 'We are open everyday 11:00am – 10:00pm. However, last entry is at 9:30 pm.' },
  { id: 3, name: 'If I purchase a VIP ticket, would I have to pay for the photos that have been taken?', text: 'No. VIP tickets include a photographer that will accompany you during your visit and send all photos to you within 4 days.' },
  { id: 4, name: 'How long can we stay at the Museum?', text: 'There is no time limit. However, visitors usually spend 45-60 minutes at the museum.' },
  { id: 5, name: 'Is this place good for children?', text: 'Yes. It is a great place for children and adults alike.' },
  { id: 6, name: 'Is there usually a wait?', text: 'Wait times varies. You can expect 10-15 minutes wait during weekdays or non-peak hours. During weekends and holidays, there might be up to 60 minutes wait.' },
];

export default function BlogArticleFAQ() {
  const [open, setOpen] = useState(1);
  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  
  return (
    <div className={`blogFAQ`}>
      <div className="container ">
        <div className="blogFAQ__title">FAQ</div>
        <div className="blogFAQ__accordion">
          {FAQs.map((item) => (
            <div key={item.id} className={`blogFAQ__accordion_item ${open === item.id}`}>
              <div className="blogFAQ__accordion_item-name flex items-center justify-between" onClick={() => handleOpen(item.id)}><div className="blogFAQ__name">{item.name}</div><div className="icon"></div></div>
              <div className="blogFAQ__accordion_item-text">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}