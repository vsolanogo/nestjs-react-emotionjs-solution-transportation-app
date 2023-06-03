import { AppThunkAction } from "../../store/store";
import { Product, Cart, CartItem } from "../../models/DeliveryModels";
import {
  selectProductsList,
} from "../selectors/selectors";

export enum CartActions {
  CART_ADD_ITEM = "delivery/cart/AddItem",
  CART_REMOVE_ITEM = "delivery/cart/RemoveItem",
  CART_UPDATE_QUANTITY_ITEM = "delivery/cart/UpdateQuantity",
  CART_REMOVE_ITEMS_LIST = "delivery/cart/RemoveItemsList",
}

const createPlainAction = (type) => (payload?) => ({ type, payload });

export const cartAddItemAction = createPlainAction(CartActions.CART_ADD_ITEM);

export const cartRemoveItemAction = createPlainAction(
  CartActions.CART_REMOVE_ITEM
);

export const cartUpdateQantityItemAction = createPlainAction(
  CartActions.CART_UPDATE_QUANTITY_ITEM
);

export const cartRemoveItemsListAction = createPlainAction(
  CartActions.CART_REMOVE_ITEMS_LIST
);

export const cartAddItemOperation =
  (productId: number): AppThunkAction<Promise<void>> =>
  async (dispatch, getState) => {
    const state = getState();
    const products: Array<Product> = selectProductsList(state);

    const product = products.find((i) => i.id === productId);

    const cartItem = {
      shopId: product?.shop.id,
      quantity: 1,
      product: product,
    };

    const newCartItem: Cart = { [productId]: cartItem as CartItem };

    dispatch(cartAddItemAction(newCartItem));
  };

export const cartRemoveItemOperation =
  (productId: number): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(cartRemoveItemAction(productId));
  };

export const cartUpdateQantityItemOperation =
  (productId: number, quantity: number): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(cartUpdateQantityItemAction({ productId, quantity }));
  };
