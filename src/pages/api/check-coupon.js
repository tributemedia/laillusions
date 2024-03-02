import { WooCommerceAPI } from "@/utils/wooCommerceApi";

export default async function handler(req, res) {
  const responseData = {
    success: false,
  };

  const { perPage, couponsName } = req?.query ?? {};

  try {
    const { data } = await WooCommerceAPI.get(
      'coupons',
      {
        per_page: perPage || 100,
        search: couponsName?.toLowerCase() || ''
      }
    );
    const usedCoupon = data?.find((item) => item?.code?.toLowerCase() === couponsName?.toLowerCase());
    if (usedCoupon?.date_expires && new Date(usedCoupon.date_expires) < Date.now()) {
      responseData.success = false;
      responseData.message = `Coupon "${couponsName}" has expired!`
      res.status(404).json(responseData)
    }
    if (usedCoupon?.code) {
      responseData.success = true;
      responseData.message = 'Coupon code already applied!';
      responseData.coupon = usedCoupon;
    } else {
      responseData.success = false;
      responseData.message = `Coupon "${couponsName}" does not exist!`
      res.status(404).json(responseData)
    }

  } catch (error) {
    res.status(500).json(responseData)
  }
  res.status(200).json(responseData)
}
