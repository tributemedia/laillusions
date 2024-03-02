import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { HOST_API_KEY, WOOCOMMERCE_KEY, WOOCOMMERCE_SECRET } from "@/config-global";

export const WooCommerceAPI = new WooCommerceRestApi({
  url: HOST_API_KEY,
  consumerKey: WOOCOMMERCE_KEY,
  consumerSecret: WOOCOMMERCE_SECRET,
  version: "wc/v3",
});