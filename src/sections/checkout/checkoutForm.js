import React, { useState, useContext, useEffect, useMemo } from "react";
// next
import Image from "next/image";
import { useRouter } from "next/router";
// lib
import parse from "html-react-parser";
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk';
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import axios from "axios";
import { yupResolver } from '@hookform/resolvers/yup';
//components
import FormProvider from "@/components/hook-form";
import RHFTextField from "@/components/hook-form/RHFTextField";
import Calendar from "@/components/calendar-time/Calendar";
import Loading from "@/components/Loading";
// routes
import { PATH_PAGE } from "@/routes/paths";
// constants
import { LIST_CALENDARS } from "@/constatns/constants";
import { HOST_API_KEY } from "@/config-global";
// utils
import { fCurrency } from "@/utils/formatNumber";
import { handleOtherPaymentMethodCheckout } from "@/utils/checkout";

import uuidv4 from "@/utils/uuidv4";
import { gtmPush } from "@/utils/gtmPush";
import { fbq } from "@/utils/fbqMeta";
// styles
import 'react-calendar/dist/Calendar.css';
import { subtotalPrice, totalPrice } from "@/utils/checkout/functions";

const CheckoutForm = ({ tickets, coupon, clearCoupon, countries }) => {
  const { push } = useRouter();
  const [ user, setUserData ] = useState(null)
  const [ requestError, setRequestError ] = useState( null );
  const [ isOrderProcessing, setIsOrderProcessing ] = useState( false );
  const [ createdOrderData, setCreatedOrderData ] = useState( null );
  const [ listCalendar, setList ] = useState([]);

  const nextCard = typeof window !== 'undefined' && localStorage?.getItem('next-cart') ?  JSON.parse(localStorage.getItem('next-cart')) : [];

  const BillingSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('First Name is required'),
    email: Yup.string().required('Email is required')
      .email('Email must be a valid email address'),
    confirm: Yup.string().required('Email is required')
      .email('Email must be a valid email address').
      oneOf([Yup.ref("email"), null], "Email don't match"),
    country: Yup.string().required('Country is required'),
    address1: Yup.string().required('Street address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    postcode: Yup.string().required('Zip code is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postcode: '',
    phone: '',
  };

  const methods = useForm({
    resolver: yupResolver(BillingSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    register,
    setError,
    clearErrors
  } = methods;

  const [product, setProduct] = useState(nextCard ? tickets.filter((item) => Number(nextCard[String(item.id)]) > 0 ) : []);

  const subtotal = subtotalPrice(product, nextCard);

  const total = totalPrice(product, coupon, nextCard);

  const onSubmit = async (data) => {
    clearErrors();
    setIsOrderProcessing(true);
    LIST_CALENDARS.map((item) => localStorage.removeItem(`calendar-${item.id}`))
    let timeCalendar = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('calendar-list')) : [];
    if(timeCalendar.length > 0 && timeCalendar.length === listCalendar.length) {
      try {
        setUserData(data);
        const state = {
          billing: {
            ...defaultValues,
            ...data,
          },
          shipping: {
            ...defaultValues,
            ...data,
          },
          createAccount: false,
          billingDifferentThanShipping: false,
          paymentMethod: Number(total) === 0 ? "COUPON" :'square_credit_card',
          status: Number(total) === 0 ? "completed" : "pending",
          metaData: timeCalendar?.map((item) => ({
            key: `_order_calendar_${item.calendar_id}`,
            value: item?.timestamp,
          })),
          couponLines: (coupon?.code && (Number(subtotal) - Number(total) > 0) && (Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount)) ? [
            {
              code: coupon?.code,
            }
          ] : undefined,
        };

        if (Number(total) === 0 && timeCalendar.length > 0)
          await Promise.all(timeCalendar.map((item) => {
            const formData = new FormData();
            formData.append('action', "booked_add_appt");
            formData.append('date', item.date);
            formData.append('calendar_id', item.calendar_id);
            formData.append('timeslot', item.timeslot);
            formData.append('timestamp', item?.timestamp);
            formData.append('guest_name', data.firstName);
            formData.append('guest_surname', data.lastName);
            formData.append('guest_email', data.email);
            formData.append('customer_type', "guest");

            return axios.post(`${HOST_API_KEY}/wp-admin/admin-ajax.php`, formData)
          }));

        // For Any other payment mode, create the order and redirect the user to payment url.
        await handleOtherPaymentMethodCheckout(
          state,
          product.map((item) => ({
            quantity: nextCard[item.id],
            product_id: item.id
          })),
          setRequestError,
          (card) => localStorage.setItem('next-cart', JSON.stringify(card)),
          setIsOrderProcessing,
          setCreatedOrderData
        ).then((data) => {
          if (data?.status === "completed") {
            const ecommerce = {
              transaction_id: data.orderId,
              currency: "USD",
              value: total,
              coupon: coupon?.code,
              items: product.map((item) => ({
                item_name: item.name,
                item_id: item.id,
                affiliation: "LAI Store",
                discount: Number(item?.regular_price ?? 0) - Number((item?.sale_price ?? item?.price) ?? 0),
                price: Number(item?.regular_price ?? item?.price),
                coupon: coupon?.code,
                quantity: nextCard[item.id],
              }))
            };
            console.log(product)
            gtmPush({
              event: 'purchase',
              ecommerce
            });
            fbq('track', 'purchase', ecommerce);
            console.log(ecommerce);
            push('/thank-you');
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
    else {
      listCalendar
        .filter((item) => !timeCalendar.map(item => item.calendar_id)?.includes(item.id))
        .map((item) => {
          setError(`calendar-${item.id}`, { message: "The date and time of the visit must be selected" })
        })
    }
  };

  useEffect(() => {
    if(nextCard) {
      setList(LIST_CALENDARS.filter((row) => !!row?.tickets?.find(item => Number(nextCard[item]) > 0 )));
      const ecommerce = {
        currency: "USD",
        value: total,
        items:
          product.map((item) => ({
            item_name: item.name,
            item_id: item.id,
            affiliation: "LAI Store",
            discount: Number(item?.regular_price ?? 0) - Number((item?.sale_price ?? item?.price) ?? 0),
            price: item.regular_price,
            quantity: nextCard[item.id],
          }))
      };

      fbq('track', 'begin_checkout', ecommerce);

      gtmPush({
        event: 'begin_checkout',
        ecommerce
      });
      // setProduct(tickets?.filter((item) => Number(nextCard[String(item.id)]) > 0 ));
    } else {
      push('/empty-checkout');
    }
    // eslint-disable-next-line
  },[]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('calendar-list');
      LIST_CALENDARS.map((item) => localStorage.removeItem(`calendar-${item.id}`))
    }
  }, []);

  let timeCalendar = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('calendar-list')) : [];

  return (
    <div className="container pb-3">
      <Loading fixed="fixed" loading={isOrderProcessing} />
      {!createdOrderData ? (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <div className="checkout flex justify-between">
            <div className="w50">
              <div className="checkout__title">Billing details</div>
              <div className="form mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <RHFTextField
                  className="sm:col-span-3"
                  label="First name*"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                />
                <RHFTextField
                  className="sm:col-span-3"
                  label="Last name*"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                />
                <RHFTextField
                  className="sm:col-span-3"
                  label="Email address"
                  name="email"
                  type="text"
                  autoComplete="email"
                />
                <RHFTextField
                  className="sm:col-span-3"
                  label="Confirm Email address"
                  name="confirm"
                  type="text"
                  autoComplete="email"
                />

                <RHFTextField
                  className="sm:col-span-3"
                  label="Company name (optional)"
                  name="company"
                  type="text"
                />

                <RHFTextField
                  className="sm:col-span-3"
                  label="City*"
                  name="city"
                  autoComplete="address-level2"
                  type="text"
                />
                <div className=" sm:col-span-3">
                  <label
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    {...register("country")}
                    autoComplete="country-name"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6 mt-2"
                    style={{ minWidth: 165, height: 36 }}
                  >
                    {countries.map((item) => (
                      <option
                        key={item?.code ?? uuidv4()}
                        value={item?.code}
                      >
                        {parse(item?.name)}
                      </option>
                    ))}
                  </select>
                </div>

                <RHFTextField
                  className="sm:col-span-2 sm:col-start-1"
                  label="Street address*"
                  name="address1"
                  autoComplete="street-address"
                  type="text"
                />
                <RHFTextField
                  className="sm:col-span-2"
                  label="Address"
                  name="address2"
                  autoComplete="address"
                  type="text"
                />

                <RHFTextField
                  className="sm:col-span-2"
                  label="State / Province*"
                  name="state"
                  autoComplete="address-level1"
                  type="text"
                />

                <RHFTextField
                  className="sm:col-span-3"
                  label="ZIP / Postal code*"
                  name="postcode"
                  autoComplete="postal-code"
                  type="text"
                />

                <RHFTextField
                  className="sm:col-span-3"
                  label="Phone*"
                  name="phone"
                  autoComplete="phone"
                  type="text"
                />
              </div>
            </div>
            <div className="w50">
              <div className="checkout__title">Additional information</div>
              {listCalendar?.map((item) => (
                <Calendar
                  key={uuidv4()}
                  id={item.id}
                  products={tickets}
                  updateProduct={() => setProduct(tickets.filter((item) => Number(JSON.parse(localStorage.getItem('next-cart'))[String(item.id)]) > 0 ))}
                />
              ))}
            </div>
            <div className="checkout__order mt-8 mb-8 w-full">
              <div className="checkout__title">Your order</div>
              <div className="mt-2 p-8 rounded-3xl ring-1 ring-gray-200 checkout__order_items flex gap-4">
                <div className="w50 ">
                  <div className="checkout__titleSmall pb-4">Product</div>
                  {product.map((item) => (
                    <div key={uuidv4()} className="checkout__order_product flex items-center justify-between pb-3">
                      <p className="text-base text-gray-600 pr-1">{item.name} × {nextCard[item.id]}</p>
                      <p className="flex items-baseline justify-center gap-x-2">
                        <span className="text-1xl tracking-tight text-gray-600">${(item?.sale_price.length > 0 ? item?.sale_price : item?.price) * nextCard[item.id]}</span>
                        {/*<span className="text-sm  leading-6 tracking-wide text-gray-600">USD</span>*/}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="w50">
                  <div
                    className="rounded-2xl p-4 bg-gray-50 py-6 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center">
                    <div className="product__price flex items-center justify-between pb-3">
                      <p className="text-base font-semibold text-gray-600">Subtotal</p>
                      <p className="flex items-baseline justify-center gap-x-2">
                        <span className="text-2xl font-bold tracking-tight text-gray-600">{fCurrency(subtotal)}</span>
                        {/*<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>*/}
                      </p>
                    </div>
                    {coupon?.id && (Number(subtotal) - Number(total)) > 0 && (
                      <div className="product__price flex items-center justify-between pb-3">
                        <div>
                          <div className="text-base font-semibold text-gray-600 relative">
                            Coupon: 
                            <div className="product__price_coupon">
                              {coupon?.code} 
                                <span
                                className="buttonCloseModal"
                                onClick={clearCoupon}
                                style={{
                                  top: '2px',
                                  right: 0,
                                  width: 20,
                                  height: 20,
                                  padding: 5,
                                  fontSize: 10
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                              </span>
                            </div>
                            
                          </div>
                          {Number(coupon?.maximum_amount) > 0 && subtotal > coupon?.maximum_amount && (
                            <p style={{ fontSize: 13, color: "red" }}>The maximum spend for this coupon is {fCurrency(coupon?.maximum_amount)} USD</p>
                          )}
                        </div>
                        <p className="flex items-baseline justify-center gap-x-2">
                          <span className="text-2xl font-bold tracking-tight text-gray-600">
                            {Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount ? `-${fCurrency(Number(subtotal) - Number(total))}` : '$0'}
                          </span>
                          {/*<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>*/}
                        </p>
                      </div>
                    )}
                    <div className="product__price flex items-center justify-between">
                      <p className=" text-2xl font-semibold text-gray-600">Total</p>
                      <p className="flex items-baseline justify-center gap-x-2">
                        <span className="text-3xl font-bold tracking-tight colorPurple">{Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount ? fCurrency(total) : fCurrency(subtotal)}</span>
                        {/*<span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>*/}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full">
              <button
                type="submit"
                className="buttonPurple mt-4"
                style={{ minWidth: '30%' }}
              >
                Place Order
              </button>
            </div>
          </div>
        </FormProvider>
      ) : (
        <div>
          <div className="checkout__order mt-8 w-full">
            <div className="checkout__title">Your order</div>
            <div className="mt-2 p-8 rounded-3xl ring-1 ring-gray-200 checkout__order_items flex gap-4">
              <div className="w50 ">
                <div className="checkout__titleSmall pb-4">Product</div>
                {product.map((item) => (
                  <div key={uuidv4()} className="checkout__order_product flex items-center justify-between pb-3">
                    <p className="text-base text-gray-600 pr-1">{item.name} × {nextCard[item.id]}</p>
                    <p className="flex items-baseline justify-center gap-x-2">
                      <span className="text-1xl tracking-tight text-gray-600">${(item?.sale_price.length > 0 ? item?.sale_price : item?.price) * nextCard[item.id]}</span>
                      <span className="text-sm  leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                  </div>
                ))}
              </div>
              <div className="w50">
                <div
                  className="rounded-2xl p-4 bg-gray-50 py-6 ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center"
                >
                  <div className="product__price flex items-center justify-between pb-3">
                    <p className="text-base font-semibold text-gray-600">Subtotal</p>
                    <p className="flex items-baseline justify-center gap-x-2">
                      <span className="text-2xl font-bold tracking-tight text-gray-600">${subtotal}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                  </div>
                  {coupon?.id && (Number(subtotal) - Number(total)) > 0 && (Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount) && (
                    <div className="product__price flex items-center justify-between pb-3">
                      <div>
                        <p
                          style={{
                            maxWidth: '300px',
                            overflow: 'hidden',
                            textWrap: 'nowrap',
                            textOverflow: 'ellipsis',
                            paddingRight: '20px'
                          }}
                          className="text-base font-semibold text-gray-600 relative"
                        >
                          Coupon: {coupon?.code}
                        </p>
                      </div>
                      <p className="flex items-baseline justify-center gap-x-2">
                          <span className="text-2xl font-bold tracking-tight text-gray-600">
                            {Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount ? `-${fCurrency(Number(subtotal) - Number(total))}` : '$0'}
                          </span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                      </p>
                    </div>
                  )}
                  <div className="product__price flex items-center justify-between">
                    <p className=" text-2xl font-semibold text-gray-600">Total</p>
                    <p className="flex items-baseline justify-center gap-x-2">
                      <span className="text-3xl font-bold tracking-tight colorPurple">{Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount ? fCurrency(total) : fCurrency(subtotal)}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-1">
              {timeCalendar?.map((item) => (item?.info ? (
                // eslint-disable-next-line react/jsx-key
                <div className="bookedForm">
                  {parse(item?.info)}
                </div>
              ) : ''))}
            </div>
          </div>
          <div className="checkout__orderInfo mt-8 w-full rounded-2xl p-4 bg-gray-50 py-6 ring-1 ring-inset ring-gray-900/5">
            <div className="checkout__orderInfo_card">
              <p className="pb-2 text-base font-semibold text-gray-600">Credit Card</p>
              <div className="flex gap-2 items-center">
                <Image
                  className="rounded-md ring-1 ring-gray-900"
                  src="/assets/svg/card/card-visa.svg"
                  alt="img"
                  width={60}
                  height={40}
                />
                <Image
                  className="rounded-md ring-1 ring-gray-900"
                  src="/assets/svg/card/card-mastercard.svg"
                  alt="img"
                  width={60}
                  height={40}
                />
                <Image
                  className="rounded-md ring-1 ring-gray-900"
                  src="/assets/svg/card/card-amex.svg"
                  alt="img"
                  width={60}
                  height={40}
                />
                <Image
                  className="rounded-md ring-1 ring-gray-900"
                  src="/assets/svg/card/card-jcb.svg"
                  alt="img"
                  width={60}
                  height={40}
                />
              </div>
              <p className="pt-2 mb-2 text-gray-900 text-sm font-medium leading-6">Pay with your credit card via our safe
                online store.</p>
              <PaymentForm
                applicationId={process.env.SQUARE_APPLICATION_ID}
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                  setIsOrderProcessing(true);
                  let timeCalendar = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('calendar-list')) : [];
                  await axios.post('api/pay', {
                    order: createdOrderData.orderId,
                    note: `${product?.map((item) => `${item.name} × ${nextCard[item.id]}`)?.join(',\n ')} \n ${coupon ? `; Payment with coupon: ${coupon.code},  subtotal = ${fCurrency(subtotal, '0.00')}, total = ${fCurrency(total, '0.00')}` : ''}`,
                    sourceId: token.token,
                    amount: Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount ? fCurrency(total, '0.00') : fCurrency(subtotal, '0.00'),
                    user,
                    timeCalendar
                  },{
                    headers: {
                      "Content-type": "application/json",
                    },
                  }).then((response) => {
                    const ecommerce = {
                      transaction_id: createdOrderData.orderId,
                      currency: "USD",
                      value: total,
                      coupon: coupon?.code,
                      items: product.map((item) => ({
                        item_name: item.name,
                        item_id: item.id,
                        affiliation: "LAI Store",
                        discount: Number(item?.regular_price ?? 0) - Number((item?.sale_price ?? item?.price) ?? 0),
                        price: Number(item?.regular_price ?? item?.price),
                        coupon: coupon?.code,
                        quantity: nextCard[item.id],
                      }))
                    };

                    fbq('track', 'purchase', ecommerce);

                    gtmPush({
                      event: 'purchase',
                      ecommerce
                    });
                    setIsOrderProcessing(false)
                    push('/thank-you')
                  }).catch((data) => {
                    console.error(data);
                    setRequestError(data);
                    setIsOrderProcessing(false);
                    const ecommerce = {
                      transaction_id: createdOrderData.orderId,
                      currency: "USD",
                      value: total,
                      coupon: coupon?.code,
                      items: product.map((item) => ({
                        item_name: item.name,
                        item_id: item.id,
                        affiliation: "LAI Store",
                        discount: Number(item?.regular_price ?? 0) - Number((item?.sale_price ?? item?.price) ?? 0),
                        price: item.regular_price,
                        quantity: nextCard[item.id],
                        coupon: coupon?.code
                      }))
                    };

                    fbq('track', 'error_payment', ecommerce);

                    gtmPush({
                      event: 'error_payment',
                      ecommerce
                    });
                  });
                }}
                createVerificationDetails={() => ({
                  amount: Number(coupon?.maximum_amount) === 0 || subtotal < coupon?.maximum_amount ? fCurrency(total, '0.00') : fCurrency(subtotal, '0.00'),
                  currencyCode: 'USD',
                  intent: 'STORE',
                  billingContact: {
                    addressLines: [user.address1, user.address2],
                    familyName: user.lastName,
                    givenName: user.firstName,
                    email: user.email,
                    country: user.country,
                    phone: user.phone,
                    city: user.city,
                  },
                })}
                locationId="F20XTEE8X3PEQ"
              >
                {requestError?.code && (
                  <p className="text-red-500 text-sm font-medium leading-6">
                    {requestError.response.data.message}
                  </p>
                )}
                <CreditCard />
                <div className="mt-8 w-full rounded-2xl p-4 py-6 ring-1 ring-inset ring-gray-900/5">
                  <p className="text-gray-700 text-sm font-medium leading-6">
                    Your personal data will be used to process your order, support your experience throughout this
                    website, and for other purposes described in our
                    <a href={PATH_PAGE.privacyPolicy} className="colorPurple"> privacy policy</a>.</p>
                  <div className="mt-4 w-full rounded-2xl bgPurple p-4 py-6 ring-1 ring-inset ring-gray-900/5">
                    <p className="text-white pb-3">- All ticket sales are final. If you have to cancel your visit, we
                      offer you a credit to use in the future. But do not offer refunds.</p>
                    <p className="text-white ">- Tickets purchased for a specific time slot do not guarantee entrance at
                      the same time slot provided due to social distancing measures.</p>
                  </div>
                </div>
              </PaymentForm>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutForm;