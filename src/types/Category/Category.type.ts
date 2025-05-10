import { UploadFile } from "antd";

export interface Category {
  id?: string;
  name: string;
  thumbnail: File | UploadFile[] | string;
  description: String;
  isDeleted?: boolean;
  createdDate?: string;
  lastModifiedDate?: string;
}
export type CategoryFilter = {
  name?: string;
  isDeleted?: boolean;
};
