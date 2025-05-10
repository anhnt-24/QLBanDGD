import { http } from "@/config";
import { ApiResponse } from "@/types";
import { ProductImage } from "@/types/ProductImage.type";

export const createProductImage = (productImageRequest: FormData) =>
  http.post<ApiResponse<ProductImage>>(
    `/product_image/upload`,
    productImageRequest,
  );

export const getProductImages = (productId: string) =>
  http.get<ApiResponse<ProductImage[]>>(`/product_image/${productId}`);

export const deleteProductImage = (imageId: string) =>
  http.delete<ApiResponse<void>>(`/product_image/${imageId}`);
