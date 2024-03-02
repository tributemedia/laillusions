export const gtmPush = (rest) => {
  window.dataLayer?.push({
    ...rest,
  });
};