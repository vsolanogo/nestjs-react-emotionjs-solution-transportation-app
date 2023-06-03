import { AnyAction } from "redux";
import { CartActions } from "./cartActions";
import { Cart } from "../../models/DeliveryModels";

export interface CartState {
  cart: Cart | undefined;
}

export const initialState: CartState = {
  cart: undefined,
};

export function cartReducer(
  state: CartState = initialState,
  action: AnyAction = { type: null, payload: null }
) {
  console.log(action);

  switch (action.type) {
    case CartActions.CART_REMOVE_ITEMS_LIST:
      return {
        ...state,
        cart: Object.keys(state.cart ?? {}).reduce(function (obj, key) {
          if (!action.payload.includes(parseInt(key))) {
            if (state?.cart?.hasOwnProperty(key)) {
              obj[key] = state.cart[key];
            }
          }
          return obj;
        }, {}),
      };

    case CartActions.CART_UPDATE_QUANTITY_ITEM:
      return {
        ...state,
        cart: Object.keys(state.cart ?? {}).reduce(function (obj, key) {
          if (key != action.payload.productId) {
            if (state?.cart?.hasOwnProperty(key)) {
              obj[key] = state.cart[key];
            }
          } else {
            if (state?.cart?.hasOwnProperty(key)) {
              obj[key] = {
                ...state.cart[key],
                quantity: action.payload.quantity,
              };
            }
          }
          return obj;
        }, {}),
      };

    case CartActions.CART_REMOVE_ITEM:
      return {
        ...state,
        cart: Object.keys(state.cart ?? {}).reduce(function (obj, key) {
          if (key != action.payload.toString()) {
            if (state?.cart?.hasOwnProperty(key)) {
              obj[key] = state.cart[key];
            }
          }
          return obj;
        }, {}),
      };

    case CartActions.CART_ADD_ITEM:
      return {
        ...state,
        cart: { ...state.cart, ...action.payload },
      };

    default:
      return state;
  }
}
