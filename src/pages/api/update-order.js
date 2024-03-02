import { WooCommerceAPI } from "@/utils/wooCommerceApi";

export default async function handler(req, res) {
  const responseData = {
    success: false,
    info: null,
  };

  const { orderID } = req?.query ?? {};

  try {
    const { data } = await WooCommerceAPI.put(
      `orders/${orderID}`,

    );

    responseData.success = true;
    responseData.products = data?.filter((item) => item.status === 'publish');

  } catch (error) {
    res.status(500).json(responseData)
  }
  res.status(200).json(responseData)
}
