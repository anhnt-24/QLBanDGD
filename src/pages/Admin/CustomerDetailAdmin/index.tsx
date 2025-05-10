import { getProductById } from "@/apis/product.api";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Modal, Image, Tag, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getCategoryById } from "@/apis/category.apis";
import { getClientById } from "@/apis/client.api";
import { getAllOrders } from "@/apis/order.api";
import { OrderFilter } from "@/types/Order.type";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { formatDateTimeWithWeekday } from "@/utils/DateTime";
import { getStatusTag } from "@/utils/OrderStatus";

function CustomerDetailAdmin() {
  const { id } = useParams();
  if (typeof id === "string" && id) {
    const { data, isLoading } = useQuery({
      queryKey: ["getClientById", id],
      queryFn: () => getClientById(id || ""),
    });
    const client = data?.data.data;

    const [open, setOpen] = useState(true);
    useEffect(() => {
      if (typeof id == "string") setOpen(true);
    }, [id]);
    const handleClose = () => {
      setOpen(false);
    };
    const [filter, setFilter] = useState<PagingRequest<OrderFilter>>({
      paging: {
        page: 1,
        size: 10,
        orders: {},
      },
      clientId: id,
    });
    const orders = useQuery({
      queryKey: ["getAllOrders", filter],
      queryFn: () => getAllOrders(filter),
    });

    const dataSource = orders.data?.data?.data;
    const paging = dataSource?.paging;
    const navigate = useNavigate();
    return (
      <Modal
        loading={isLoading}
        open={open}
        footer={null}
        onCancel={handleClose}
        title={<h4 style={{ marginBottom: 0 }}>Thông tin khách hàng</h4>}
        width={700}
        destroyOnClose
        afterClose={() => navigate("/admin/customer")}
      >
        <div className="flex max-h-150 flex-col gap-4 overflow-auto pr-2">
          <div className="rounded-xl bg-white p-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-gray-700">
              <div>
                <p>Họ tên</p>
                <p className="font-medium">{client?.name}</p>
              </div>
              <div>
                <p>Email</p>
                <p className="font-medium">{client?.email}</p>
              </div>
              <div>
                <p>Số điện thoại</p>
                <p className="font-medium">{client?.phone}</p>
              </div>
              <div>
                <p>Tổng chi tiêu</p>
                <p className="font-medium">
                  {client?.totalSpent?.toLocaleString("vi-VN")} VND
                </p>
              </div>
              <div>
                <p>Số đơn hàng</p>
                <p className="font-medium">{client?.numOrder ?? 0}</p>
              </div>
              <div>
                <p className="text-gray-500">Ngày tạo</p>
                <p className="font-medium">{client?.createdDate}</p>
              </div>
            </div>
          </div>

          <h4 className="mb-3 text-base font-semibold text-gray-800">
            Lịch sử mua hàng
          </h4>
          <div className="max-h-96 space-y-3 overflow-y-auto rounded-xl bg-gray-50 p-4 shadow-sm">
            {dataSource?.contents.map((order) => (
              <div
                key={order.id}
                className="rounded-md border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-700">
                    Mã đơn hàng: {order.orderCode}
                  </p>
                  <span
                    className={`text-sm font-semibold ${
                      order.status === "Đã giao"
                        ? "text-green-600"
                        : order.status === "Đang giao"
                          ? "text-yellow-600"
                          : "text-gray-500"
                    }`}
                  >
                    {getStatusTag(order.status || "")}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    Ngày mua:{" "}
                    <span className="font-medium text-gray-800">
                      {formatDateTimeWithWeekday(order.createdDate)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
            {dataSource?.contents.length === 0 && (
              <p>Khách hàng chưa đặt sản phẩm nào.</p>
            )}
          </div>
        </div>
      </Modal>
    );
  }
  return <></>;
}

export default CustomerDetailAdmin;
