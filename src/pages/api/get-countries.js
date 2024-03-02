import { WooCommerceAPI } from "@/utils/wooCommerceApi";

export default async function handler(req, res) {
  const responseData = {
    success: false,
    info: null,
  };

  try {
    const { data } = await WooCommerceAPI.get(
      'data/countries',
      {
        per_page: 200,
      }
    );

    responseData.success = true;
    responseData.countries = data;

  } catch (error) {
    res.status(500).json(responseData)
  }
  res.status(200).json(responseData)
}
