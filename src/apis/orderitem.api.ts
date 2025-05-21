import { http, instance } from "@/config";
import { ApiResponse } from "@/types";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";
import {
  OrderItem,
  OrderItemFilter,
  OrderItemUpdate,
} from "@/types/OrderItem.type";

export const createOrderItem = (orderItemRequest: OrderItem) =>
  http.post<ApiResponse<OrderItem>>("/order-item/create", orderItemRequest);

export const updateOrderItem = (orderItemRequest: OrderItemUpdate) =>
  instance.put<ApiResponse<OrderItem>>("/order-item/update", orderItemRequest);

export const getAllOrderItems = (
  searchRequest: PagingRequest<OrderItemFilter>,
) =>
  http.post<ApiResponse<PagingResponse<OrderItem>>>(
    "/order-item/get/all",
    searchRequest,
  );

export const getOrderItemById = (id: string) =>
  http.get<ApiResponse<OrderItem>>(`/order-item/${id}`);

// export const deleteOrderItemById = (id: string, isDeleted: boolean) =>
//   http.delete<ApiResponse<string>>(`/order-item/${id}`, {
//     params: { isDeleted },
//   });

// export const deleteOrderItemsByListId = (listId: string[], isDeleted: boolean) =>
//   http.delete<ApiResponse<string>>("/order-item/delete-multiple", {
//     data: listId,
//     params: { isDeleted },
//   });
