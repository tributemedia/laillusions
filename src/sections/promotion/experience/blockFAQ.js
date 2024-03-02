import { useState } from 'react';

const FAQs = [
  { id: 1, name: 'What does the VIP experience include?', text: 'The VIP experience includes a private tour guide and photographer to guide you through the museum and take pictures of your experience. You will also receive a special gift at the end of the tour.' },
  { id: 2, name: 'Is the VIP experience available for individuals or only for groups?', text: 'The VIP experience is available for both individuals and groups.' },
  { id: 3, name: 'How long does the VIP experience last?', text: 'The VIP experience can vary, typically lasting around 1-2 hours.' },
  { id: 4, name: 'Can I bring my camera or equipment for the VIP experience?', text: 'While our photographer will take photos, you are welcome to bring your camera or equipment to capture your experience.' },
  { id: 5, name: 'How much does the VIP experience cost?', text: 'The cost of the VIP experience will vary depending on your group\'s size and the VIP package you select.' },
  { id: 6, name: 'How do I book a VIP experience at the Museum of Illusions?', text: 'You can book a VIP experience directly through our website at the Ticket\'s page' },
  { id: 7, name: 'Is the VIP experience suitable for children?', text: 'The VIP experience is suitable for all ages, although the museum as a whole is geared towards young adults and adults.' },
  
];

const context = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does the VIP experience include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The VIP experience includes a private tour guide and photographer to guide you through the museum and take pictures of your experience. You will also receive a special gift at the end of the tour."
      }
    },
    {
      "@type": "Question",
      "name": "Is the VIP experience available for individuals or only for groups?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The VIP experience is available for both individuals and groups."
      }
    },
    {
      "@type": "Question",
      "name": "How long does the VIP experience last?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The VIP experience can vary, typically lasting around 1-2 hours."
      }
    },
    {
      "@type": "Question",
      "name": "Can I bring my camera or equipment for the VIP experience?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "While our photographer will take photos, you are welcome to bring your camera or equipment to capture your experience."
      }
    },
    {
      "@type": "Question",
      "name": "How much does the VIP experience cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The cost of the VIP experience will vary depending on your group\'s size and the VIP package you select."
      }
    },
    {
      "@type": "Question",
      "name": "How do I book a VIP experience at the Museum of Illusions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can book a VIP experience directly through our website at the Ticket\'s page"
      }
    },
    {
      "@type": "Question",
      "name": "Is the VIP experience suitable for children?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The VIP experience is suitable for all ages, although the museum as a whole is geared towards young adults and adults."
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