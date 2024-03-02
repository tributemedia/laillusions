import * as Yup from "yup";
import FormProvider from "@/components/hook-form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextFieldUnderline from "../../components/hook-form/RHFTextFieldUnderline";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const ContactUsForm = () => {
  const ContactUsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    message: Yup.string().required('Message is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ContactUsSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods;

  const onSubmit = async (message) => {
    let messageText = `Name: ${message.name}\nEmail: ${message.email}\nMessage:\n${message.message}`;
    let subject = 'New Message from Illusion LA website';

    const data = {
      name: subject,
      message: messageText,
    };

    fetch('https://v9zc6m5ub4.execute-api.us-east-1.amazonaws.com/default/SendMessageLAContactUS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({data}),
    })
      .then(response => response.json())
      .then(data => {
        if(data.statusCode === 200){
          reset();
          NotificationManager.success('Your message has been sent');
        } else {
          NotificationManager.error('Something went wrong');
        }
      });
  }

    return (
      <div>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="formSubmit">
              <RHFTextFieldUnderline
                placeholder="Enter your name"
                name="name"
                type="text"
                autocomplete="off"
              />
              <RHFTextFieldUnderline
                placeholder="Enter your E-mail"
                name="email"
                type="text"
                autocomplete="off"
              />
              <RHFTextFieldUnderline
                placeholder="Type your message here"
                name="message"
                type="text"
              />
              <button type="submit" className="buttonPurple flex w-full justify-center ">Submit Now</button>
          </div>
        </FormProvider>
        <NotificationContainer/>
      </div>
    )
}

export default ContactUsForm;