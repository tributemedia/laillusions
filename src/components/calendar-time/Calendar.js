import { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";

// components
import CalendarTime from "@/components/calendar-time/CalendarTime";
// utils
import uuidv4 from "@/utils/uuidv4";
import { LIST_CALENDARS } from "@/constatns/constants";

// ------------------------------------------------------------------------------------------

const ChoiceData = ({ id, products, updateProduct }) => {
  const card = JSON.parse(localStorage.getItem('next-cart'));
  const time = typeof window !== "undefined" ? JSON?.parse(localStorage.getItem('calendar-list')) : undefined;
  const calendarDate = moment(localStorage.getItem(`calendar-${id}`) || time?.find(item => item.calendar_id === id)?.date || new Date())
  let eProduct = new Object(card);

  const [date, setDate] = useState(calendarDate);

  const utcOffset = 0 - (moment.parseZone(date).utcOffset() / 60);

  const momentDate = moment(date).add(utcOffset, 'hour'); // American
  // const momentDate = moment(date) // RB

  const listProduct = Object.keys(card)
    .map(item => Number(card[item]) > 0 ? item : undefined)
    .filter(item => !!Number(item));

  const product = products.filter(item => listProduct.includes(String(item.id)));
  const listCalendar = LIST_CALENDARS.find(item => item.id === id);

  const handleChange = (date) => {
    localStorage.setItem(`calendar-${id}`, date);
    setDate(date);
    const listProducts = product.filter(item => listCalendar.tickets.includes(item.id));
    if(date && [0,5,6].includes(Number(moment(date)?.format('d')))) {
      listProducts.map(item => {
        if(item.attributes.find(elem => elem.name === "weekends")) {
          eProduct[item.attributes[0].options[0]] = card[item.id];
          eProduct[item.id] = undefined;
        }
      });
    } else if(date && [1,2,3,4].includes(Number(moment(date)?.format('d')))) {
      listProducts.map(item => {
        if(item.attributes.find(elem => elem.name === "weekdays")) {
          eProduct[item.attributes[0].options[0]] = card[item.id];
          eProduct[item.id] = undefined;
        }
      });
    }
    localStorage.setItem('next-cart', JSON.stringify(eProduct));
    updateProduct(eProduct);
  }

  return (
    <div key={uuidv4()} className="calendar mt-5">
      <Calendar
        onChange={handleChange}
        value={momentDate.format()}
        minDate={new Date()}
        minDetail="month"
        maxDetail="month"
        // locale="en-US"
      />
      <CalendarTime
        date={momentDate}
        calendar_id={id}
      />
    </div>
  )
}

export default ChoiceData;