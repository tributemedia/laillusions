import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

import MainLayout from '@/layouts/main';
import CheckoutForm from "@/sections/checkout/checkoutForm";
import Loading from "@/components/Loading";

import { HOST_SITE_URL } from "@/config-global";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dynamic from "next/dynamic";

Checkout.getLayout = (page) => <MainLayout> {page} </MainLayout>;
const MetaTags = dynamic(() => import('@/components/MetaTags'));

export default function Checkout({ tickets, countries }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState(null);

  const schema = Yup.object().shape({
    code: Yup.string().required('Coupon code is required'),
  });

  const defaultValues = {
    code: '',
  };

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    handleSubmit,
    setError,
  } = methods;

  const handleChangeCoupon = (selectedCoupon) => {
    setCoupon(selectedCoupon);
    localStorage.setItem('next-coupon', JSON.stringify(selectedCoupon));
  }

  useEffect(() => {
    if (typeof window !== "undefined")
      setCoupon(JSON.parse(localStorage.getItem('next-coupon')));
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      await axios.get("api/check-coupon", {
        params: {
          couponsName: data.code
        }
      }).then(({ data }) => {
        handleChangeCoupon(data.coupon)
        setLoading(false);
        setOpen(false);
      })
    } catch (e) {
      setLoading(false);
      setError("code", { message: e.response.data.message });
      console.error(e.response.data.message)
    }
  }

  return (
    <>
      <MetaTags />
      <div className="blockCheckout">
        <div className="blockCheckout__top">
          <div className="blockCheckout__top_title">Checkout</div>
          <div className="blockCheckout__top_coupon">
            Have a coupon?
            <a onClick={() => setOpen(true)}> Enter Promo Code</a>
          </div>
        </div>

        <CheckoutForm
          tickets={tickets}
          coupon={coupon}
          clearCoupon={() => handleChangeCoupon(null)}
          countries={countries}
        />

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-90 transition-opacity md:block"/>
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex min-h-full justify-center text-center items-center md:px-2 lg:px-4">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                  enterTo="opacity-100 translate-y-0 md:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 md:scale-100"
                  leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
                >
                  <Dialog.Panel
                    className="flex modalCoupon transform text-left bg-white text-base transition md:my-8"
                  >
                    <Loading loading={loading}/>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                      <div className="relative flex w-full items-center overflow-hidden p-6 shadow-2xl ">
                        <button
                          type="button"
                          className="buttonCloseModal"
                          onClick={() => setOpen(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 30 30" width="20px" height="20px"><path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"/></svg>
                        </button>
                        <div className="modalCoupon__form">
                          <div className="text-1xl font-bold tracking-tight">
                            If you have a coupon code, please apply it below.
                          </div>
                          <div className="mt-6 flex modalCoupon__form_elements items-end max-w-md gap-x-4">
                            <RHFTextField
                              name="code"
                              label="Coupon code"
                              className="min-w-0 relative modalCoupon__form_input flex-auto rounded-md border-0 bg-white text-white"
                            />
                            <button
                              type="submit"
                              className="buttonPurple"
                            >
                              Apply coupon
                            </button>
                          </div>
                        </div>
                      </div>
                    </FormProvider>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  try {
    const { data: { products } } = await axios.get(`${HOST_SITE_URL}/api/get-products`);
    const { data: { countries } } = await axios.get(`${HOST_SITE_URL}/api/get-countries`);

    return {
      props: {
        tickets: products ?? [],
        countries: countries ?? [],
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: {
        tickets: [],
        countries: [],
        error: e
      },
    };
  }
}
