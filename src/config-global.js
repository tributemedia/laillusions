
export const HOST_API_KEY = process.env.HOST_API_KEY || '';

export const HOST_SITE_URL = process.env.HOST_SITE_URL || '';
export const META_FB_ID = process.env.META_FB_ID || '';

export const WOOCOMMERCE_KEY = process.env.WOOCOMMERCE_KEY
export const WOOCOMMERCE_SECRET = process.env.WOOCOMMERCE_SECRET

export const API_POSTS = `/posts?_embed`
export const API_COMMENTS = `/comments`
export const API_CATEGORIES = `/categories`
export const API_USER = `/users`

export const WOOCOMMERCE_STATES_ENDPOINT = `${ HOST_API_KEY }/wp-json/rae/v1/wc/states`;