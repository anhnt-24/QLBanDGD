import { useState } from "react";
import type {
  TablePaginationConfig,
  FilterValue,
  SorterResult,
} from "antd/es/table/interface";

interface PagingRequest<T> {
  paging: {
    page: number;
    size: number;
    orders: Record<string, "ASC" | "DESC">;
  };
  [key: string]: any;
}

export function useTableFilter<T extends object>(
  initialFilter: PagingRequest<T>,
) {
  const [filter, setFilter] = useState<PagingRequest<T>>(initialFilter);

  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const newFilter = { ...filter };

    newFilter.paging.page = pagination.current || 1;
    newFilter.paging.size = pagination.pageSize || 10;

    if (Array.isArray(sorter)) {
      sorter.forEach((s) => {
        if (s.field && s.order) {
          newFilter.paging.orders[String(s.field)] =
            s.order === "ascend" ? "ASC" : "DESC";
        }
      });
    } else if (sorter?.field && sorter?.order) {
      newFilter.paging.orders = {
        [String(sorter.field)]: sorter.order === "ascend" ? "ASC" : "DESC",
      };
    } else {
      newFilter.paging.orders = {};
    }
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value && Array.isArray(value) && value.length > 0) {
        if (key != "status") newFilter[key] = value[0];
        else {
          newFilter[key] = value;
        }
      } else {
        delete newFilter[key];
      }
    });
    setFilter(newFilter);
  };

  return {
    filter,
    setFilter,
    handleTableChange,
  };
}
