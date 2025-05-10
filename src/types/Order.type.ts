import { Client } from "./Client.type";

export interface Order {
  id?: string;
  orderCode?: string;
  client?: Client;
  clientId?: string;
  deliveryFee: number;
  totalAmount: number;
  status?: "PROCESSING" | "COMPLETED" | "CANCELLED" | "PAID" | string;
  deliveryAddress?: string;
  createdDate: string;
  methodPayment?: "COD" | "VNPAY" | string;
}

export interface OrderUpdate {
  id?: string;
  status: "PROCESSING" | "COMPLETED" | "CANCELLED" | string;
}
export type OrderFilter = {
  orderCode?: string;
  clientId?: string;
};
