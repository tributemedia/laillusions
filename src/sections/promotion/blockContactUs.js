import Image from 'next/image';
import ContactUsForm from "@/sections/promotion/ContactUsForm";

export default function BlockContactUs() {
  return (
    <div className={`blogContact`}>
      <div className="container flex items-center">
        <div className="w50 contact">
          <div className="contact__title">Contact Us</div>
          <div className="contact__text">Contact us for general questions or business opportunities.</div>
          <div className="contact__info flex items-center">
            <div  className="contact__info_icon flex items-center justify-center">
              <Image
                src="/assets/svg/email.svg"
                alt="img"
                width={25}
                height={17}
              />
            </div>
            <div className="contact__info_text">infola@bigfunnyusa.com</div>
          </div>
          <div className="contact__info flex items-center">
            <div  className="contact__info_icon flex items-center justify-center">
              <Image
                src="/assets/svg/phone.svg"
                alt="img"
                width={17}
                height={29}
              />
            </div>
            <div className="contact__info_text">(800) 593-2902</div>
          </div>
          <div className="contact__info flex items-center">
            <div  className="contact__info_icon flex items-center justify-center">
              <Image
                src="/assets/svg/location.svg"
                alt="img"
                width={21}
                height={27}
              />
            </div>
            <div className="contact__info_text">6751 Hollywood Blvd, Los Angeles, CA 90028</div>
          </div>
          
        </div>
        <div className="w50">
          <div className="contact__title">Contact Us</div>
          <div className="contact__text">Contact us for general questions or business opportunities.</div>
          <ContactUsForm />
        </div>
      </div>
    </div>
  )
}