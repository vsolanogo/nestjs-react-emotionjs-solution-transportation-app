import { AnyAction } from "redux";
import { DeliveryActions } from "./deliveryActions";
import {
  Shop,
  Product,
  Order,
  User,
  AddressGeometry,
} from "../../models/DeliveryModels";

export interface DeliveryState {
  shop: Array<Shop>;
  product: Array<Product>;
  order: Order | null;
  user: User | undefined;
  userName: string;
  email: string;
  phone: string;
  address: string;
  userError: string | null;
  historyOrders: Array<Order>;
  historyOrdersError: string | null;
  addressGeometry: AddressGeometry | null;
}

export const initialState: DeliveryState = {
  shop: [],
  product: [],
  order: null,
  user: undefined,
  userName: "",
  email: "",
  phone: "",
  address: "",
  userError: null,
  historyOrders: [],
  historyOrdersError: null,
  addressGeometry: null,
};

export function deliveryReducer(
  state: DeliveryState = initialState,
  action: AnyAction = { type: null, payload: null }
) {
  switch (action.type) {
    case DeliveryActions.ADDRESS_GEOMETRY_UPDATE:
      return {
        ...state,
        addressGeometry: action.payload,
      };

    case DeliveryActions.LOAD_HISTORY_ORDERS_START:
      return {
        ...state,
        historyOrders: [],
        historyOrdersError: null,
      };

    case DeliveryActions.LOAD_HISTORY_ORDERS_SUCCESS:
      return {
        ...state,
        historyOrders: action.payload,
        historyOrdersError: null,
      };

    case DeliveryActions.LOAD_HISTORY_ORDERS_ERROR:
      return {
        ...state,
        historyOrders: [],
        historyOrdersError: action.payload,
      };

    case DeliveryActions.LOAD_PRODUCTS_ERROR:
      return {
        ...state,
        historyOrders: [],
        historyOrdersError: action.payload,
      };

    case DeliveryActions.ORDER_CREATE_START:
      return {
        ...state,
        order: null,
      };

    case DeliveryActions.ORDER_CREATE_SUCCESS:
      return {
        ...state,
        order: action.payload,
      };

    case DeliveryActions.USER_DELETE_ERROR:
      return {
        ...state,
        userError: null,
      };

    case DeliveryActions.USER_CREATE_START:
      return {
        ...state,
        userError: null,
      };

    case DeliveryActions.USER_CREATE_ERROR:
      return {
        ...state,
        userError: action.payload,
      };

    case DeliveryActions.USER_CREATE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    case DeliveryActions.NAME_UPDATE:
      return {
        ...state,
        userName: action.payload,
      };

    case DeliveryActions.EMAIL_UPDATE:
      return {
        ...state,
        email: action.payload,
      };

    case DeliveryActions.PHONE_UPDATE:
      return {
        ...state,
        phone: action.payload,
      };

    case DeliveryActions.ADDRESS_UPDATE:
      return {
        ...state,
        address: action.payload,
      };

    case DeliveryActions.CLEAR_PRODUCTS:
      return {
        ...state,
        product: [],
      };

    case DeliveryActions.LOAD_PRODUCTS_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };

    case DeliveryActions.LOAD_SHOPS_SUCCESS:
      return {
        ...state,
        shop: action.payload,
      };

    default:
      return state;
  }
}
