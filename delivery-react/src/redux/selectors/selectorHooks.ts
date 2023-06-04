import { createSelector } from "reselect";
import { useAppSelector } from "../../store/store";
import { Shop, Product, Cart, User, Order } from "../../models/DeliveryModels";
import {
  selectShopsList,
  selectProductsList,
  selectCart,
  selectCartIds,
  selectCartShops,
  selectCartShopsWithCartItems,
  selectDeliveryState,
  selectUserError,
  selectUser,
  selectOrder,
  selectReduxMainState,
  selectOrdersHistoryError,
  selectHistoryOrders,
} from "./selectors";

export const useReduxMainState = (): any =>
  useAppSelector(createSelector(selectReduxMainState, (i) => i));

export const useDeliveryState = (): any =>
  useAppSelector(createSelector(selectDeliveryState, (i) => i));

export const useShops = (): Array<Shop> =>
  useAppSelector(createSelector(selectShopsList, (i) => i));

export const useUserError = (): string | null =>
  useAppSelector(createSelector(selectUserError, (i) => i));

export const useUser = (): User | null =>
  useAppSelector(createSelector(selectUser, (i) => i));

export const useOrder = (): User | null =>
  useAppSelector(createSelector(selectOrder, (i) => i));

export const useProducts = (): Array<Product> =>
  useAppSelector(createSelector(selectProductsList, (i) => i));

export const useCart = (): Cart =>
  useAppSelector(createSelector(selectCart, (i) => i));

export const useCartIds = (): Array<number> =>
  useAppSelector(createSelector(selectCartIds, (i) => i));

export const useCartShops = (): Array<Shop> =>
  useAppSelector(createSelector(selectCartShops, (i) => i));

export const useCartShopsWithCartItems = (): Array<any> =>
  useAppSelector(createSelector(selectCartShopsWithCartItems, (i) => i));

export const useOrdersHistoryError = (): string | null =>
  useAppSelector(createSelector(selectOrdersHistoryError, (i) => i));

export const useHistoryOrders = (): Array<Order> =>
  useAppSelector(createSelector(selectHistoryOrders, (i) => i));
