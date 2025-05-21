import { http, instance } from "@/config";
import { ApiResponse } from "@/types";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";
import { Product, ProductFilter } from "@/types/Product/Product.type";

interface SanPhamType {
  id?: String | number;
  ten: String;
  loai: String;
  gia: String | number;
  mota?: String;
}
interface ChiTietSanPhamType {
  id?: String;
  kichco: String;
  mausac: String;
  soluong: String | number;
  sanphamId: String | number;
}

export const createSanPham = (sanpham: SanPhamType) =>
  http.post("/sanpham/create", sanpham);

export const createChiTietSanPham = (chiTietSanPham: ChiTietSanPhamType) =>
  http.post("/bienthe/create", chiTietSanPham);

export const createAnh = (formdata: FormData) =>
  http.post("/anh/create", formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const getAllSanPham = () => http.get("/sanpham/get/all");

export const getAllProduct = (
  productSearchRequest: PagingRequest<ProductFilter> | Object,
) =>
  http.post<ApiResponse<PagingResponse<Product>>>(
    "/product/get/all",
    productSearchRequest,
  );

export const createProduct = (productRequest: FormData) =>
  instance.post<ApiResponse<Product>>("/product/create", productRequest);

export const getProductById = (id: string) =>
  http.get<ApiResponse<Product>>(`/product/get/${id}`);

export const updateProduct = (productRequest: FormData) =>
  instance.put<ApiResponse<Product>>(`/product/update`, productRequest);

export const deleteProductById = (id: string, isDeleted: boolean) =>
  instance.delete<ApiResponse<String>>(`/product/delete/${id}/${isDeleted}`);

export const deleteProductByListID = (listId: string[], isDeleted: boolean) =>
  instance.delete<ApiResponse<String>>(`/product/delete/${isDeleted}`, {
    data: listId,
  });

export const restoreProductByListId = (listId: String[]) =>
  instance.put<ApiResponse<String>>("/product/restore", listId);
