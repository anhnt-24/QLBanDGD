export interface Review {
  id: string;
  rating: number;
  comment: string;
  productId: string;
  clientName: string;
  phone: string;
  createdDate?: string;
  lastModifiedDate?: string;
}
