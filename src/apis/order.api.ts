import { http, instance } from "@/config";
import { ApiResponse } from "@/types";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";
import { Order, OrderFilter, OrderUpdate } from "@/types/Order.type";

export const createOrder = (orderRequest: Order) =>
  http.post<ApiResponse<Order>>("/order/create", orderRequest);

export const updateOrder = (orderRequest: OrderUpdate) =>
  instance.put<ApiResponse<Order>>("/order/update", orderRequest);

export const getAllOrders = (searchRequest: PagingRequest<OrderFilter>) =>
  http.post<ApiResponse<PagingResponse<Order>>>(
    "/order/get/all",
    searchRequest,
  );

export const getOrderById = (id: string) =>
  http.get<ApiResponse<Order>>(`/order/get/${id}`);

// export const deleteOrderById = (id: string, isDeleted: boolean) =>
//   http.delete<ApiResponse<string>>(`/order/${id}`, {
//     params: { isDeleted },
//   });

// // Nếu có xoá nhiều
// export const deleteOrdersByListId = (listId: string[], isDeleted: boolean) =>
//   http.delete<ApiResponse<string>>("/order/delete-multiple", {
//     data: listId,
//     params: { isDeleted },
//   });
