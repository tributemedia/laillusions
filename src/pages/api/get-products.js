import { WooCommerceAPI } from "@/utils/wooCommerceApi";

export default async function handler(req, res) {
  const responseData = {
    success: false,
    info: null,
  };

  const { perPage, status } = req?.query ?? {};
  try {
    const { data } = await WooCommerceAPI.get(
      'products',
      {
        per_page: perPage || 100,
      }
    );

    responseData.success = true;
    responseData.products = data?.filter((item) => status ? item?.stock_status === status : item);
  } catch (error) {
    res.status(404).json(responseData)
  }
  res.status(200).json(responseData)
}
