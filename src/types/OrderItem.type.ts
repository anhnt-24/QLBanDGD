import { Product } from "./Product/Product.type";
export interface OrderItem {
  id?: string;
  orderId?: string;
  proudctId?: string;
  product: Product;
  quantity?: number;
  unitPrice?: number;
  totalPrice?: number;
  deliveryAddress?: string;
  orderStatus?: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"; // cập nhật theo enum thật
  isDeleted?: boolean;
}
export interface OrderItemUpdate {
  id: string;
  orderStatus: "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED"; // cập nhật theo enum thật
}
export type OrderItemFilter = {
  orderId?: string;
};
