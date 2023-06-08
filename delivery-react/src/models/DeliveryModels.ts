export interface AddressGeometry {
  latitude: number;
  longitude: number;
}
export interface OrderDto {
  userId: number;
  orderItems: Array<OrderItemDto>;
}

export interface OrderItemDto {
  productId: number;
  quantity: number;
}

export interface Cart {
  [productId: number]: CartItem;
}
export interface Shop {
  id: number;
  shopName: string;
  latitude: number;
  longitude: number;
}

export interface Product {
  id: number;
  productName: string;
  price: number;
  calories: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  shop: Shop;
}

export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}

export interface CartItem {
  shopId: number;
  quantity: number;
  product: Product;
}

export interface Order {
  id: number;
  user: User;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  latitude: number;
  longitude: number;
}

export interface User {
  id: number;
  userName: string;
  phone: string;
  email: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
