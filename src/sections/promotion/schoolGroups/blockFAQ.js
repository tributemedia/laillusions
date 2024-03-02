import { useState } from 'react';

const FAQs = [
  { id: 1, name: 'What is the recommended age group for school field trips?', text: 'School field trips are recommended for children of all ages, from elementary school to high school.' },
  { id: 2, name: 'What subjects will the children learn about during the field trip?', text: 'During the field trip, children will learn about the science of perception, the art of perspective, and other related subjects.' },
  { id: 3, name: 'Is the World of Illusions interactive?', text: 'Yes, the World of Illusions is highly interactive and provides hands-on experiences for children.' },
  { id: 4, name: 'How can I schedule a school field trip to the World of Illusions?', text: 'You can contact the World of Illusions directly to schedule a school field trip.' },
  { id: 5, name: 'Is there a discount for School Trips?', text: 'Yes, the World of Illusions offers special pricing for School Trips.' },
  { id: 6, name: 'How long does a typical school field trip take?', text: 'The duration of a school field trip will depend on the size of the group and the activities planned, but a typical field trip lasts 2-3 hours.' },
  { id: 7, name: 'What should the children wear for the field trip?', text: 'Children should wear comfortable, appropriate clothing for an indoor activity.' },
  { id: 8, name: 'Is food allowed in the World of Illusions?', text: 'Food and drinks are not allowed inside the World of Illusions.' },
];

const context = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is the recommended age group for school field trips?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "School field trips are recommended for children of all ages, from elementary school to high school."
      }
    },
    {
      "@type": "Question",
      "name": "What subjects will the children learn about during the field trip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "During the field trip, children will learn about the science of perception, the art of perspective, and other related subjects."
      }
    },
    {
      "@type": "Question",
      "name": "Is the World of Illusions interactive?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the World of Illusions is highly interactive and provides hands-on experiences for children."
      }
    },
    {
      "@type": "Question",
      "name": "How can I schedule a school field trip to the World of Illusions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can contact the World of Illusions directly to schedule a school field trip."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a discount for School Trips?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, the World of Illusions offers special pricing for School Trips."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a typical school field trip take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The duration of a school field trip will depend on the size of the group and the activities planned, but a typical field trip lasts 2-3 hours."
      }
    },
    {
      "@type": "Question",
      "name": "What should the children wear for the field trip?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Children should wear comfortable, appropriate clothing for an indoor activity."
      }
    },
    {
      "@type": "Question",
      "name": "Is food allowed in the World of Illusions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Food and drinks are not allowed inside the World of Illusions."
      }
    }
  ]
}

export default function BlockFAQ() {
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