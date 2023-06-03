import { AppThunkAction } from "../../store/store";
import { ShopApi, ProductsApi, UsersApi, OrdersApi } from "../../api/api";
import {
  selectUserType,
  selectUserError,
  selectUser,
  selectCartShopsWithCartItems,
} from "../selectors/selectors";

import { cartRemoveItemsListAction } from "../cart/cartActions";

export enum DeliveryActions {
  LOAD_APP = "delivery/app/Load",
  LOAD_SHOPS_START = "delivery/shop/Load/start",
  LOAD_SHOPS_SUCCESS = "delivery/shop/Load/success",
  LOAD_SHOPS_ERROR = "delivery/shop/Error/error",

  LOAD_PRODUCTS_START = "delivery/product/Load/start",
  LOAD_PRODUCTS_SUCCESS = "delivery/product/Load/success",
  LOAD_PRODUCTS_ERROR = "delivery/product/Load/Error",
  CLEAR_PRODUCTS = "delivery/product/Clear",

  NAME_UPDATE = "delivery/cart/name",
  EMAIL_UPDATE = "delivery/cart/email",
  PHONE_UPDATE = "delivery/cart/phone",
  ADDRESS_UPDATE = "delivery/cart/address",

  USER_CREATE_START = "delivery/user/Create/start",
  USER_CREATE_SUCCESS = "delivery/user/Create/success",
  USER_CREATE_ERROR = "delivery/user/Create/error",
  USER_DELETE_ERROR = "delivery/order/Delete/error",

  ORDER_CREATE_START = "delivery/order/Create/start",
  ORDER_CREATE_SUCCESS = "delivery/order/Create/success",
  ORDER_CREATE_ERROR = "delivery/order/Create/error",
}

const createPlainAction = (type) => (payload?) => ({ type, payload });

export const loadAppAction = createPlainAction(DeliveryActions.LOAD_APP);

export const loadShopsStartAction = createPlainAction(
  DeliveryActions.LOAD_SHOPS_START
);
export const loadShopsSuccessAction = createPlainAction(
  DeliveryActions.LOAD_SHOPS_SUCCESS
);
export const loadShopsErrorAction = createPlainAction(
  DeliveryActions.LOAD_SHOPS_ERROR
);

export const loadProductsStartAction = createPlainAction(
  DeliveryActions.LOAD_PRODUCTS_START
);

export const loadProductsSuccessAction = createPlainAction(
  DeliveryActions.LOAD_PRODUCTS_SUCCESS
);
export const loadProductsErrorAction = createPlainAction(
  DeliveryActions.LOAD_PRODUCTS_ERROR
);

export const clearProductsAction = createPlainAction(
  DeliveryActions.CLEAR_PRODUCTS
);

export const nameUpdateAction = createPlainAction(DeliveryActions.NAME_UPDATE);

export const emailUpdateAction = createPlainAction(
  DeliveryActions.EMAIL_UPDATE
);

export const phoneUpdateAction = createPlainAction(
  DeliveryActions.PHONE_UPDATE
);

export const addressUpdateAction = createPlainAction(
  DeliveryActions.ADDRESS_UPDATE
);

export const loadAppOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch) => {
    dispatch(loadShopsOperation());
  };

export const loadShopsOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch) => {
    dispatch(loadShopsStartAction());

    try {
      const res = await ShopApi.get();

      dispatch(loadShopsSuccessAction(res.data));
    } catch (error) {
      dispatch(loadShopsErrorAction(error));
    }
  };

export const loadProductsOperation =
  (id): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(loadProductsStartAction());

    try {
      const res = await ProductsApi.getByShopId(id);

      dispatch(loadProductsSuccessAction(res.data));
    } catch (error) {
      dispatch(loadProductsErrorAction(error));
    }
  };

export const clearProductsOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch) => {
    dispatch(clearProductsAction());
  };

export const nameUpdateOperation =
  (str: string): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(nameUpdateAction(str));
  };

export const emailUpdateOperation =
  (str: string): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(emailUpdateAction(str));
  };

export const phoneUpdateOperation =
  (str: string): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(phoneUpdateAction(str));
  };

export const addressUpdateOperation =
  (str: string): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(addressUpdateAction(str));
  };

export const userCreateStartAction = createPlainAction(
  DeliveryActions.USER_CREATE_START
);

export const userCreateSuccessAction = createPlainAction(
  DeliveryActions.USER_CREATE_SUCCESS
);
export const userCreateErrorAction = createPlainAction(
  DeliveryActions.USER_CREATE_ERROR
);

export const userDeleteErrorAction = createPlainAction(
  DeliveryActions.USER_DELETE_ERROR
);

export const createOrderStartAction = createPlainAction(
  DeliveryActions.ORDER_CREATE_START
);

export const createOrderSuccessAction = createPlainAction(
  DeliveryActions.ORDER_CREATE_SUCCESS
);
export const createOrderErrorAction = createPlainAction(
  DeliveryActions.ORDER_CREATE_ERROR
);

export const userCreateOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch, getState) => {
    const state = getState();

    dispatch(userCreateStartAction());

    try {
      const res = await UsersApi.post(selectUserType(state));

      dispatch(userCreateSuccessAction(res.data));
    } catch (error: any) {
      dispatch(userCreateErrorAction(error?.response?.data ?? error));
    }
  };

export const createOrderOperation =
  (shopId: number): AppThunkAction<Promise<void>> =>
  async (dispatch, getState) => {
    const state = getState();

    if (!!selectUserError(state)) {
      return;
    }

    const user = selectUser(state);
    const cartShopItems = selectCartShopsWithCartItems(state);
    const orderItems = cartShopItems
      .find((i) => i.id === shopId)
      .cart.map((i) => ({
        quantity: parseInt(i.quantity),
        productId: i.product.id,
      }));
    console.log({ cartShopItems });

    const orderDto = { userId: user?.id, orderItems: orderItems };

    dispatch(createOrderStartAction());

    try {
      const res = await OrdersApi.post(orderDto);

      dispatch(createOrderSuccessAction(res.data));
      dispatch(cartRemoveItemsListAction(orderItems.map((i) => i.productId)));
    } catch (error) {
      dispatch(createOrderErrorAction(error));
    }
  };
