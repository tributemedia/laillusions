import { WooCommerceAPI } from "@/utils/wooCommerceApi";

class WCApiService {
  static async getTickets(query) {
    try {
      return await WooCommerceAPI.get(
        'products',
        {
          per_page: query?.perPage || 100,
        });
    } catch (error) {
      return [];
    }
  }

}

export default WCApiService;
