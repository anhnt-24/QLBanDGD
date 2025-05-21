import { http, instance } from "@/config";
import { ApiResponse } from "@/types";
import { ProductDescription } from "@/types/ProductDescription.type";

export const getProductDescriptionById = (id: string) =>
  http.get<ApiResponse<ProductDescription>>(`/product-descriptions/get/${id}`);

export const updateProductDescription = (request: ProductDescription) =>
  instance.put<ApiResponse<ProductDescription>>(
    "/product-descriptions/update",
    request,
  );

export const deleteProductDescriptionById = (id: string) =>
  instance.delete<ApiResponse<void>>(`/product-descriptions/delete/${id}`);
