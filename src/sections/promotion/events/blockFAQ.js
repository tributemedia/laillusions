import { useState } from 'react';

const FAQs = [
  { id: 1, name: 'What type of events can be held at the World of Illusions?', text: 'The World of Illusions is perfect for birthday parties, family gatherings, corporate events, school trips, and more.' },
  { id: 2, name: 'What is included in the party package?', text: 'The party package includes full access to all of the interactive exhibits and art pieces at the World of Illusions and special pricing for groups.' },
  { id: 3, name: 'Can I bring my food and drinks to the party?', text: 'Please contact us directly to inquire about the food and beverage policy.' },
  { id: 4, name: 'Is there a minimum number of guests required for a party or event?', text: 'No, there is no minimum number of guests required for a party or event at the World of Illusions.' },
  { id: 5, name: 'Can I decorate the party space for my event?', text: 'Decorations are allowed at the World of Illusions, but please contact us directly to inquire about our decoration policy and any restrictions that may apply.' },
  { id: 6, name: 'Can I hire a photographer for my event?', text: 'Yes, you can hire a photographer for your event at the World of Illusions. Contact us directly for more information.' },
  { id: 7, name: 'Is there a deposit required to hold a date for my event?', text: 'The deposit policy for events at the World of Illusions may vary by location. Please contact us directly to inquire about our deposit policy.' },
];

const context = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What type of events can be held at the World of Illusions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The World of Illusions is perfect for birthday parties, family gatherings, corporate events, school trips, and more."
      }
    },
    {
      "@type": "Question",
      "name": "What is included in the party package?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The party package includes full access to all of the interactive exhibits and art pieces at the World of Illusions and special pricing for groups."
      }
    },
    {
      "@type": "Question",
      "name": "Can I bring my food and drinks to the party?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The party package includes full access to all of the interactive exhibits and art pieces at the World of Illusions and special pricing for groups."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a minimum number of guests required for a party or event?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No, there is no minimum number of guests required for a party or event at the World of Illusions."
      }
    },
    {
      "@type": "Question",
      "name": "Can I decorate the party space for my event?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Decorations are allowed at the World of Illusions, but please contact us directly to inquire about our decoration policy and any restrictions that may apply."
      }
    },
    {
      "@type": "Question",
      "name": "Can I hire a photographer for my event?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can hire a photographer for your event at the World of Illusions. Contact us directly for more information."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a deposit required to hold a date for my event?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The deposit policy for events at the World of Illusions may vary by location. Please contact us directly to inquire about our deposit policy."
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