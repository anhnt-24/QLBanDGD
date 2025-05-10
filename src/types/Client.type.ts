export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent?: number;
  numOrder?: number;
  createdDate: string;
}

export type ClientFilter = {
  name?: string;
  phone?: string;
  email?: string;
};
