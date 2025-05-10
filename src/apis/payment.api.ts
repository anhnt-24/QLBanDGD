import { Order } from "@/types/Order.type";
import { http } from "@/config";
import { ApiResponse } from "@/types";

export const createPayment = (orderRequest: Order) =>
  http.post<ApiResponse<string>>("/payment/create", orderRequest);

export const checkPayment = (params: Record<string, string>) =>
  http.post<ApiResponse<string>>("/payment/result", null, { params });
