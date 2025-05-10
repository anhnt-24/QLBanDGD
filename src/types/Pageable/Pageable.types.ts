export type PagingRequest<T> = {
  paging: {
    page: number;
    size: number;
    orders: Record<string, "ASC" | "DESC">;
  };
} & {
  [K in keyof T]: T[K];
};

export interface PagingResponse<T> {
  contents: T[];
  paging: {
    pageNumber: number;
    pageSize: number;
    totalPage: number;
    totalRecord: number;
  };
}
