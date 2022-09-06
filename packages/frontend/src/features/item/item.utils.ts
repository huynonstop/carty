export const totalPriceReducer = (items: any[]) => {
  return items.reduce((pre, { price, quantity }) => {
    return pre + price * quantity;
  }, 0);
};

export const buyPriceReducer = (items: any[]) => {
  return items.reduce((pre, { price, quantity, buyerId }) => {
    if (buyerId) return pre + price * quantity;
    else return pre;
  }, 0);
};
