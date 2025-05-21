import { Review } from "./../types/Review.type";
import { http, instance } from "@/config";
import { Category, CategoryFilter } from "../types/Category/Category.type";
import { ApiResponse } from "@/types";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";

export const getAllComment = (
  reviewSearchRequest: PagingRequest<CategoryFilter> | Object,
) =>
  http.post<ApiResponse<PagingResponse<Review>>>(
    "/review/get/all",
    reviewSearchRequest,
  );

export const createComment = (review: Review) =>
  http.post<ApiResponse<Review>>("/review/create", review);

export const updateComment = (review: Review) =>
  http.put<ApiResponse<Review>>(`/review/update`, review);

export const deleteCommentById = (id: string, isDeleted: boolean) =>
  instance.delete<ApiResponse<String>>(`/review/delete/${id}/${isDeleted}`);
