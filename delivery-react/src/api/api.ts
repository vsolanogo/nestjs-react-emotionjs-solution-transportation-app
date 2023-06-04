import axios from "axios";

// const apiUrl = "https://api.mulhollandbot.com";
const apiUrl = "/api";

const urls = {
  shops: `${apiUrl}/shop`,
  products: `${apiUrl}/products`,
  shopProducts: (shopId: number) => `${apiUrl}/shop/${shopId}/products`,
  users: `${apiUrl}/user`,
  userOrders: (userId: number) => `${apiUrl}/user/${userId}/orders`,
  order: `${apiUrl}/order`,
  orderHistory: `${apiUrl}/order/history`,
};

export const ShopApi = {
  get() {
    return axios.get(urls.shops);
  },
};

export const ProductsApi = {
  get() {
    return axios.get(urls.products);
  },
  getByShopId(shopId: number) {
    return axios.get(urls.shopProducts(shopId));
  },
};

export const UsersApi = {
  post(body) {
    return axios.post(urls.users, body);
  },
};

export const OrdersApi = {
  post(body) {
    return axios.post(urls.order, body);
  },
  getByUserId(userId) {
    return axios.get(urls.userOrders(userId));
  },
  getByContactInfo(body) {
    return axios.post(urls.orderHistory, body);
  },
};
