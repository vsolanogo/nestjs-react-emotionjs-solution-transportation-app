export const selectReduxMainState = (state) => state ?? null;
export const selectDeliveryState = (state) => state?.delivery ?? null;
export const selectCartState = (state) => state?.cart ?? null;

export const selectShopsList = (state) =>
  selectDeliveryState(state)?.shop ?? [];

export const selectProductsList = (state) =>
  selectDeliveryState(state)?.product ?? [];

export const selectCart = (state) => selectCartState(state)?.cart ?? null;

export const selectCartIds = (state) =>
  selectCart(state)
    ? Object.keys(selectCart(state)).map((i) => parseInt(i))
    : [];

export const selectCartShopsIds = (state) => {
  const cart = selectCart(state);

  return [...new Set(selectCartIds(state).map((i) => cart[i].shopId))];
};

export const selectCartShops = (state) => {
  const cartShopsids = selectCartShopsIds(state);
  const shops = selectShopsList(state);

  return shops.filter((i) => cartShopsids.includes(i.id));
};

export const selectCartShopsWithCartItems = (state) => {
  const cart = selectCart(state);
  const cartIds = selectCartIds(state);

  return selectCartShops(state).map((j) => ({
    ...j,
    cart: cartIds.map((i) => cart[i]).filter((i) => i.shopId === j.id),
    orderPrice: cartIds
      .map((i) => cart[i])
      .filter((i) => i.shopId === j.id)
      .map((i) => i.product.price * i.quantity)
      .reduce((a, b) => {
        return a + b;
      }, 0),
  }));
};

export const selectUserType = (state) => {
  const delivery = selectDeliveryState(state);
  const user = {
    userName: delivery.userName,
    phone: delivery.phone,
    email: delivery.email,
    address: delivery.address,
  };

  return user;
};

export const selectUserError = (state) => {
  return selectDeliveryState(state)?.userError ?? null;
};

export const selectOrdersHistoryError = (state) => {
  return selectDeliveryState(state)?.historyOrdersError ?? null;
};

export const selectHistoryOrders = (state) => {
  return selectDeliveryState(state)?.historyOrders ?? [];
};

export const selectUser = (state) => selectDeliveryState(state)?.user ?? null;
export const selectOrder = (state) => selectDeliveryState(state)?.order ?? null;
