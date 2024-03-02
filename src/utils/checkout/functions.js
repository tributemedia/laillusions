export const totalPrice = (product, coupon, nextCard) => {
  let limitUseItem = coupon?.limit_usage_to_x_items ?? 500;

  return product
    .map((item) => {
      const amount = coupon?.amount;
      const discount_type = coupon?.discount_type;
      const productCategoriesID = item?.categories?.map(categories => categories.id);
      const listProductCat = coupon?.product_categories?.map((prodCat) => productCategoriesID.includes(prodCat));
      const excludedListProductCat = coupon?.excluded_product_categories?.map((prodCat) => productCategoriesID.includes(prodCat));
      const totalElement = Number(item?.sale_price?.length > 0 ? item?.sale_price : item?.price) * nextCard[String(item?.id)];

      if (coupon?.exclude_sale_items && item?.sale_price?.length > 0) {
        return totalElement
      }
      if (coupon?.excluded_product_ids?.length > 0 && coupon?.excluded_product_ids?.includes(item.id)) {
        return totalElement;
      }
      if(excludedListProductCat?.length && excludedListProductCat?.join(', ')?.includes("true")) {
        return totalElement;
      }
      if (!listProductCat?.length || listProductCat && listProductCat?.join(', ')?.includes("true")) {
        if ((coupon?.product_ids.length > 0 && coupon?.product_ids?.includes(item.id)) || coupon?.product_ids.length === 0) {
          if (limitUseItem > 0) {
            limitUseItem -= 1;
            if (discount_type === "percent") {
              return totalElement - (totalElement * amount / 100)
            }
            if (discount_type === "fixed_cart") {
              return totalElement - amount
            }
            if (discount_type === "fixed_product") {
              return totalElement - (amount * nextCard[String(item?.id)])
            }
          }
        }
      }
      return (totalElement)
    })
    .reduce((a, b) => a + b, 0);
}

export const subtotalPrice = (product, nextCard) => product.map((item) => Number(item?.sale_price.length > 0 ? item?.sale_price : item?.price) * nextCard[String(item.id)]).reduce((a, b) => a + b, 0);
