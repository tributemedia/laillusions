import * as Yup from "yup";
import {useContext} from 'react';
import FormProvider, {RHFTicket} from "@/components/hook-form";
import { useForm } from "react-hook-form";
import {AppContext} from "@/context";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextFieldUnderline from "../../components/hook-form/RHFTextFieldUnderline";
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const QuoteForm = () => {
  const [_, setQuote] = useContext(AppContext);
  const ContactUsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    occasion: Yup.string().required('Occasion is required'),
  });

  const methods = useForm({
    resolver: yupResolver(ContactUsSchema),
  });

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods;

  const onSubmitQuote = async (quote) => {
    setQuote(quote);
    let messageText = `Name: ${quote.name}\nEmail: ${quote.email}\nGroup: ${quote.group}\nOccasion:\n${quote.occasion}`;
    let subject = 'Quote from Illusion LA website';

    const data = {
      name: subject,
      message: messageText,
    };

    fetch('https://xw4iql27x4.execute-api.us-east-1.amazonaws.com/default/SendMessageLAQuote', {
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmitQuote)}>
          <div className="formSubmit formSubmit__quote">
            <RHFTextFieldUnderline
              placeholder="Enter your name"
              name="name"
              type="text"
              autoComplete="name"
            />
            <RHFTextFieldUnderline
              placeholder="Enter your E-mail"
              name="email"
              type="text"
              autoComplete="email"
            />
            <RHFTextFieldUnderline
              placeholder="Occasion"
              name="occasion"
              type="text"
            />
            <div className="formSubmit__count flex items-center justify-between">
              <div className="formSubmit__count_text">Group of</div>
              <RHFTicket name={String('group')}></RHFTicket>
            </div>
            <button type="submit" className="buttonPurple flex w-full justify-center ">Get Quote</button>
          </div>
          
        </FormProvider>
      </div>
    )
}

export default QuoteForm;