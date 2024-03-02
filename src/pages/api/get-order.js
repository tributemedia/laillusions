import { WooCommerceAPI } from "@/utils/wooCommerceApi";

export default async function handler(req, res) {
  const responseData = {
    success: false,
    info: null,
  };

  const { id } = req?.query ?? {};

  console.log(id)

  try {
    const { data } = await WooCommerceAPI.get(
      `orders/${id}`,
    );
    // const data = { }

    responseData.success = true;
    responseData.order = data;
  } catch (error) {
    res.status(404).json(responseData)
  }
  res.status(200).json(responseData)
}
