import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import {
  DeliveryState,
  deliveryReducer,
} from "../redux/delivery/deliveryReducer";
import { CartState, cartReducer } from "../redux/cart/cartReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

export type AppThunkAction<R = void> = ThunkAction<
  R,
  AppStore,
  undefined,
  AnyAction
>;

const cartPersistConfig = {
  key: "cart",
  storage: storage,
};

const persistCartReducer = persistReducer(cartPersistConfig, cartReducer);

export interface AppStore {
  delivery: DeliveryState;
  cart: CartState;
}

export const store = configureStore({
  reducer: { delivery: deliveryReducer, cart: persistCartReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const persistor = persistStore(store);
