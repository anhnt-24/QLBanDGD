// services/categoryApi.ts
import { http, instance } from "@/config";
import { Category, CategoryFilter } from "../types/Category/Category.type";
import { ApiResponse } from "@/types";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";
import { Search } from "@/types/Search.type";

export const getAllCategory = (
  categorySearchRequest: PagingRequest<CategoryFilter> | Object,
) =>
  http.post<ApiResponse<PagingResponse<Category>>>(
    "/category/get/all",
    categorySearchRequest,
  );

export const createCategory = (categoryRequest: FormData) =>
  instance.post<ApiResponse<Category>>("/category/create", categoryRequest);

export const getCategoryById = (id: string) =>
  http.get<ApiResponse<Category>>(`/category/get/${id}`);

export const updateCategory = (categoryRequest: FormData) =>
  instance.put<ApiResponse<Category>>(`/category/update`, categoryRequest);

export const deleteCategoryById = (id: string, isDeleted: boolean) =>
  instance.delete<ApiResponse<String>>(`/category/delete/${id}/${isDeleted}`);

export const deleteCategoryByListID = (listId: string[], isDeleted: boolean) =>
  instance.delete<ApiResponse<String>>(`/category/delete/${isDeleted}`, {
    data: listId,
  });

export const restoreCategoryByListId = (listId: String[]) =>
  instance.put<ApiResponse<String>>("/category/restore", listId);

export const getAllCategoryForSelect = () =>
  instance.get<ApiResponse<Search[]>>("/category/select");
