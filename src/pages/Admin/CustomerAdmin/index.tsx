import { getAllClients } from "@/apis/client.api";
import TableAdminProduct from "@/components/src/TableAdminProduct";
import { useTableFilter } from "@/hooks/useTableFilter";
import { useTableSearch } from "@/hooks/useTableSearch";
import { Client, ClientFilter } from "@/types/Client.type";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { formatDateTimeWithWeekday } from "@/utils/DateTime";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Outlet } from "react-router";

function CustomerAdmin() {
  const { filter, setFilter, handleTableChange } = useTableFilter<ClientFilter>(
    {
      paging: {
        page: 1,
        size: 10,
        orders: {},
      },
      name: "",
    },
  );
  const { getColumnSearchProps } = useTableSearch(setFilter);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      render: (_: any, __: any, index: number) => {
        return (filter.paging.page - 1) * filter.paging.size + index + 1;
      },
      key: "index",
      align: "center",
      width: "40px",
    },
    {
      title: "Họ và tên ",
      dataIndex: "name",
      key: "name",
      sorter: true,
      ...getColumnSearchProps("name"),
      render: (text: string, record: Client) => (
        <Link to={`/admin/customer/${record.id}`} className="text-primary">
          {text}
        </Link>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Ngày tham gia",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: true,
      render: (_: any, record: Client) =>
        formatDateTimeWithWeekday(record.createdDate),
    },
    {
      title: "Tổng thanh toán (₫) ",
      dataIndex: "totalSpent",
      key: "totalSpent",
      sorter: true,
      render: (_: any, record: Client) => record?.totalSpent?.toLocaleString(),
    },
    {
      title: "Số đơn hàng ",
      dataIndex: "numOrder",
      key: "numOrder",
      sorter: true,
      render: (_: any, record: Client) => record?.numOrder?.toLocaleString(),
    },
  ];

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllClients", filter],
    queryFn: () => getAllClients(filter),
  });

  const dataSource = data?.data?.data;
  const paging = dataSource?.paging;
  console.log(dataSource);
  return (
    <>
      <TableAdminProduct
        onChange={handleTableChange}
        loading={isLoading}
        quantity={paging?.totalRecord}
        onClickRefresh={() => refetch()}
        onClickExport={() => 2}
        title="Danh sách khách hàng"
        dataSource={dataSource?.contents}
        columns={columns}
        pagination={{
          current: paging?.pageNumber,
          pageSize: paging?.pageSize,
          total: paging?.totalRecord,
          onChange: (page: number, pageSize: number) => {
            setFilter((prev: any) => ({
              ...prev,
              paging: {
                ...prev.paging,
                page,
                size: pageSize,
              },
            }));
          },
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
      <Outlet></Outlet>
    </>
  );
}

export default CustomerAdmin;
