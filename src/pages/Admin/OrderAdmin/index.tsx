import { getAllOrders } from "@/apis/order.api";
import TableAdminProduct from "@/components/src/TableAdminProduct";
import { Order, OrderFilter } from "@/types/Order.type";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@/components";
import { Outlet } from "react-router";
import { getStatusTag } from "@/utils/OrderStatus";
import { formatDateTimeWithWeekday } from "@/utils/DateTime";
import { useTableSearch } from "@/hooks/useTableSearch";
import { useTableFilter } from "@/hooks/useTableFilter";

function OrderAdmin() {
  const { filter, setFilter, handleTableChange } = useTableFilter<OrderFilter>({
    paging: {
      page: 1,
      size: 10,
      orders: {},
    },
  });

  const { getColumnSearchProps, getColumnFilterProps } =
    useTableSearch(setFilter);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllOrders", filter],
    queryFn: () => getAllOrders(filter),
  });
  const dataSource = data?.data?.data;
  const paging = dataSource?.paging;
  const status = [
    { key: "PROCESSING", label: "Đang xử lý" },
    { key: "COMPLETED", label: "Hoàn thành" },
    { key: "CANCELLED", label: "Đã hủy" },
    { key: "PAID", label: "Đã thanh toán" },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => {
        return (filter.paging.page - 1) * filter.paging.size + index + 1;
      },
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "orderCode",
      key: "orderCode",
      align: "center",

      render: (_: any, record: Order) => (
        <Link to={`/admin/order/${record.id}`} className="text-primary">
          {record.orderCode}
        </Link>
      ),
      ...getColumnSearchProps("orderCode"),
    },

    {
      title: "Người nhận",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (_: any, record: Order) => record.client?.name,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",

      render: (_: any, record: Order) => record.client?.phone,
    },
    {
      title: "Địa chỉ",
      dataIndex: "deliveryAddress",
      align: "center",
      key: "deliveryAddress",
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      align: "center",
      key: "status",

      render: (status: string) => getStatusTag(status),
      sorter: true,
      ...getColumnFilterProps(status),
    },

    {
      title: "Đặt lúc",
      dataIndex: "createdDate",
      align: "center",
      key: "createdDate",
      render: (_: any, record: Order) =>
        formatDateTimeWithWeekday(record.createdDate),
      sorter: true,
    },
    {
      title: "Hình thức thanh toán",
      key: "methodPayment",
      dataIndex: "methodPayment",
      align: "center" as const,
    },
    {
      title: "Phí vận chuyển (₫)",
      dataIndex: "deliveryFee",
      align: "center",
      key: "deliveryFee",
      render: (_: any, record: Order) => record.deliveryFee.toLocaleString(),
      sorter: true,
    },
    {
      title: "Thành tiền (₫)",
      dataIndex: "totalAmount",
      align: "center",
      key: "totalAmount",
      render: (_: any, record: Order) => record.totalAmount.toLocaleString(),
      sorter: true,
    },
  ];

  return (
    <>
      <TableAdminProduct
        onChange={handleTableChange}
        loading={isLoading}
        quantity={paging?.totalRecord}
        onClickRefresh={() => refetch()}
        onClickExport={() => 2}
        title="Danh sách đơn hàng"
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
      <Outlet />
    </>
  );
}

export default OrderAdmin;
