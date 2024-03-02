import React, { useEffect, useState } from "react";
import parse from 'html-react-parser';

import axios from "axios";

import { HOST_API_KEY } from "@/config-global";
import moment from "moment";
import Loading from "@/components/Loading";
import { useFormContext } from "react-hook-form";
import { gtmPush } from "@/utils/gtmPush";
import { fbq } from "@/utils/fbqMeta";
import momentTZ from "moment-timezone";

const CalendarTime = ({
  date,
  calendar_id
}) => {
  const { clearErrors, formState: { errors } } = useFormContext();

  const [calendar, setCalendar] = useState(null);
  const [elementTime, setElementTime] = useState(null);
  const [timeslot, setTime] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const mainBookForm = typeof window !== "undefined" ? document.getElementById(`bookedForm-${calendar_id}`) : undefined;
  const time = typeof window !== "undefined" ? JSON?.parse(localStorage.getItem('calendar-list')) : undefined;

  const [selectedTime, setSelected] = useState(time?.find(item => item.calendar_id === calendar_id) ?? null);

  const selectDate = moment(date).format('YYYY-MM-DD')

  const formData = new FormData();
  formData.append('action', "booked_calendar_date");
  formData.append('date', selectDate);
  formData.append('calendar_id', calendar_id);

  useEffect(() => {
    if (time?.find(item => item.calendar_id === calendar_id)?.date !== selectDate) {
      setSelected(null)
      setLoading(true)
      axios.post(`${HOST_API_KEY}/wp-admin/admin-ajax.php`, formData)
        .then(({ data }) => {
          setCalendar(data);
          setLoading(false);
          const list = JSON.parse(localStorage.getItem('calendar-list'));
          localStorage.setItem('calendar-list', JSON.stringify(list?.filter((e) => e.calendar_id !== calendar_id) ?? []));
        });
    }
    // eslint-disable-next-line
  }, [selectDate, calendar_id]);

  const handleClick = (item) => {
    setTime(item.getAttribute("data-timeslot"));
    const formData1 = new FormData();
    formData1.append('action', "booked_new_appointment_form");
    formData1.append('date', item.getAttribute("data-date"));
    formData1.append('timeslot', item.getAttribute("data-timeslot"));
    formData1.append('calendar_id', item.getAttribute("data-calendar-id"));

    axios.post(`${HOST_API_KEY}/wp-admin/admin-ajax.php`, formData1)
      .then(({ data }) => {
        setCalendar(null);
        setElementTime(data);
      });
  }

  useEffect(() => {
    if (typeof window !== "undefined" && mainBookForm) {
      const list = [...mainBookForm.querySelectorAll(".new-appt")];
      list?.map((item) => {
        item.setAttribute("type", "button");
        item.addEventListener("click", () => handleClick(item));
      })
    }
    // eslint-disable-next-line
  }, [calendar]);

  useEffect(() => {
    if (mainBookForm && elementTime) {
      // mainBookForm.querySelector('#element-info').innerHTML = mainBookForm?.querySelector(".booked-appointment-details")?.innerHTML;
      if (typeof window !== 'undefined') {
        const list = JSON.parse(localStorage.getItem('calendar-list'));
        const timestamp = moment(`${selectDate} ${timeslot ? timeslot?.slice(0, 2) : ':00'}`)
        const utcOffset = (moment.parseZone(Date.now()).utcOffset() / 60);
        const currentAppointment = {
          timeslot,
          calendar_id,
          date: selectDate,
          timestamp: moment(timestamp.add(utcOffset, 'hour')).unix(),
          info: mainBookForm?.querySelector(".booked-appointment-details")?.innerHTML
        };
        clearErrors(`calendar-${calendar_id}`);
        setSelected(currentAppointment);
        gtmPush({
          'event': 'click_book_appointment',
          data: currentAppointment
        })
        fbq('track', 'click_book_appointment', currentAppointment);
        localStorage.setItem('calendar-list', JSON.stringify([
          ...list?.filter((e) => e.calendar_id !== calendar_id) ?? [],
          currentAppointment
        ]));
      }
    }
    // eslint-disable-next-line
  }, [elementTime]);

  return (
    <div className={`bookedForm ${errors[`calendar-${calendar_id}`] && "error"}`} id={`bookedForm-${calendar_id}`}>
      <Loading loading={isLoading} position="relative" padding="20px"/>
      {!time?.find(item => item.calendar_id === calendar_id) && calendar && parse(calendar)}
      <div hidden>
        {elementTime && parse(elementTime)}
      </div>
      {elementTime && (
        <div id="element-info" />
      )}
      <div id="element-info" >
        {selectedTime?.info && parse(selectedTime?.info)}
      </div>
      {errors[`calendar-${calendar_id}`] && (<p style={{ color: "red",position: "absolute", left: 0, top: "100%", fontSize: '12px'}}>{errors[`calendar-${calendar_id}`].message}</p>)}
    </div>
  )
};

export default CalendarTime;