import { UploadFile } from "antd";
export interface Product {
  id: string;
  name: string;
  description?: string;
  categoryId?: string;
  brand: string;
  sellingPrice: number | 0;
  thumbnail: string | UploadFile[] | File;
  promotionPrice: number | 0;
  sold: number;
  importPrice: number | 0;
  isDeleted?: boolean;
  stock: number;
  rating?: number;
}

export type ProductFilter = {
  name?: string;
  isDeleted?: boolean;
  categoryId?: string;
};
