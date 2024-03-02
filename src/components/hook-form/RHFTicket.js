import PropTypes from 'prop-types';
// form
import { useFormContext } from 'react-hook-form';
import { gtmPush } from "@/utils/gtmPush";
import { fbq } from "@/utils/fbqMeta";

// ----------------------------------------------------------------------

RHFTicket.propTypes = {
  name: PropTypes.string,
  item: PropTypes.object,
};

export default function RHFTicket({ name, item }) {
  const { watch, setValue, register } = useFormContext();

  const ecommerce = {
    currency: "USD",
    value: item?.salePrice.length > 0 ? item?.salePrice : item?.price,
    items: [
      {
        item_id: item?.id,
        item_name: item?.name,
        affiliation: "LAI Store",
        discount: Number(item?.regular_price ?? 0) - Number((item?.sale_price ?? item?.price) ?? 0),
        price: item?.regular_price,
        quantity: Number(watch(name))
      }
    ]
  };

  const countUp = () => {
    setValue(name, Number(watch(name) + 1 ));
    if (name !== 'group') {
      fbq('track', 'add_to_cart', ecommerce);
      gtmPush({
        event: "add_to_cart",
        ecommerce
      })
    }
  }

  const countDown = () => {
    setValue(name, Number(!!Number(watch(name)) && watch(name) - 1 ));
    if (name !== 'group') {
      fbq('track', 'remove_from_cart', ecommerce);
      gtmPush({
        event: 'remove_from_cart',
        ecommerce
      });
    }
  }

  return (
    <div className="ticketsScreen__item_count count">
      <div className="buttonPurple count__down" onClick={countDown}>
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 12C2 11.4477 2.44772 11 3 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H3C2.44772 13 2 12.5523 2 12Z" fill="#ffffff"/>
        </svg>
      </div>
      <input
        readOnly
        className="count__input"
        type="text"
        defaultValue={Number(0)}
        {...register(name)}
      />
      <div className="buttonPurple count__up" onClick={countUp}>
        <svg width="800px" height="800px" viewBox="0 0 24 24" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 12H20M12 4V20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </div>
  );
}
