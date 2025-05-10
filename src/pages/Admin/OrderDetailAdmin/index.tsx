import React, { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Tag,
  Divider,
  Table,
  Select,
  message,
} from "antd";
import {
  OrderItem,
  OrderItemFilter,
  OrderItemUpdate,
} from "@/types/OrderItem.type";
import { Order, OrderUpdate } from "@/types/Order.type";
import { useNavigate, useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderById, updateOrder } from "@/apis/order.api";
import { getStatusTag } from "@/utils/OrderStatus";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { Filter } from "lucide-react";
import { getAllOrderItems, updateOrderItem } from "@/apis/orderitem.api";
import { formatDateTimeWithWeekday } from "@/utils/DateTime";
import { Button } from "@/components";
import { title } from "process";

const { Title, Text } = Typography;
const { Option } = Select;

function OrderDetailAdmin() {
  const { id } = useParams();
  if (typeof id == "string") {
    const [modalVisible, setModalVisible] = useState(true);
    const { data, isLoading } = useQuery({
      queryKey: ["getOrderById", id],
      queryFn: () => {
        return getOrderById(id);
      },
    });
    const order = data?.data.data;

    const [filter, setFilter] = useState<PagingRequest<OrderItemFilter>>({
      paging: {
        page: 1,
        size: 10,
        orders: {},
      },
      orderId: id,
    });

    const [updatedOrderStatus, setUpdatedOrderStatus] = useState<string>("");
    const [updatedItemStatuses, setUpdatedItemStatuses] = useState<
      Record<string, string>
    >({});

    const orderitems = useQuery({
      queryKey: ["getAllOrderItem", Filter],
      queryFn: () => getAllOrderItems(filter).then((data) => data?.data.data),
      enabled: !!order?.id,
    });
    React.useEffect(() => {
      if (order) {
        setUpdatedOrderStatus(order.status || "");
        if (orderitems) {
          setUpdatedItemStatuses(
            orderitems.data?.contents.reduce((acc: any, item) => {
              acc[item?.id || ""] = item.orderStatus;
              return acc;
            }, {}),
          );
        }
      }
    }, [orderitems.data]);

    const closeModal = () => {
      setModalVisible(false);
    };
    const handleChangeOrderStatus = (value: string) => {
      setUpdatedOrderStatus(value);

      if (value === "COMPLETED" || value === "CANCELED") {
        setUpdatedItemStatuses((prevState) => {
          if (value === "COMPLETED") value = "DELIVERED";
          const updatedStatuses = Object.keys(prevState).reduce(
            (acc, itemId) => {
              acc[itemId] = value;
              return acc;
            },
            {} as Record<string, string>,
          );
          return updatedStatuses;
        });
      }
    };
    const handleStatusChange = (status: string, itemId: string) => {
      setUpdatedItemStatuses((prev) => {
        const updatedStatuses = { ...prev, [itemId]: status };
        const allItemsCompleted = Object.values(updatedStatuses).every(
          (itemStatus) => itemStatus === "DELIVERED",
        );
        const allItemsCanceled = Object.values(updatedStatuses).every(
          (itemStatus) => itemStatus === "CANCELED",
        );
        let newOrderStatus = "PROCESSING";
        if (allItemsCompleted) {
          newOrderStatus = "COMPLETED";
        } else if (allItemsCanceled) {
          newOrderStatus = "CANCELED";
        }
        setUpdatedOrderStatus(newOrderStatus);

        return updatedStatuses;
      });
    };
    const queryClient = useQueryClient();
    const handleSave = async () => {
      const updatedOrderData: OrderUpdate = {
        id: order?.id,
        status: updatedOrderStatus,
      };
      const orderItems: OrderItemUpdate[] = Object.entries(
        updatedItemStatuses,
      ).map(([itemId, status]) => ({
        id: itemId,
        orderStatus: status as OrderItemUpdate["orderStatus"],
      }));
      await orderItems.map((item) => updateOrderItem(item));
      await updateOrder(updatedOrderData);
    };
    const { mutate, isPending } = useMutation({
      mutationFn: () => handleSave(),
      onSuccess: () => {
        queryClient.invalidateQueries(
          {
            queryKey: ["getOrderById", order?.id],
          },
          {},
        );
        queryClient.invalidateQueries({ queryKey: ["getAllOrderItem"] });
        queryClient.invalidateQueries({ queryKey: ["getAllOrders"] });

        message.success("Cập nhật thành công.");
      },
      onError: () => {
        message.error("Cập nhật thất bại.");
      },
    });
    const columns = [
      {
        title: "Sản phẩm",
        dataIndex: "productName",
        key: "productName",
        render: (_: any, record: OrderItem) => (
          <div className="flex items-center gap-2">
            {typeof record.product.thumbnail == "string" && (
              <img
                src={record.product.thumbnail}
                className="h-15 rounded-xs"
              ></img>
            )}
            {record.product.name.toLocaleString()}
          </div>
        ),
      },
      {
        title: "Số lượng",
        dataIndex: "quantity",
        key: "quantity",
        align: "center" as const,
      },
      {
        title: "Đơn giá (₫)",
        dataIndex: "product.price",
        key: "product.price",
        align: "center" as const,
        render: (_: any, record: OrderItem) =>
          record.product.promotionPrice.toLocaleString(),
      },
      {
        title: "Thành tiền (₫)",
        key: "total",
        align: "center" as const,
        render: (_: any, record: OrderItem) =>
          record.totalPrice?.toLocaleString(),
      },
      {
        title: "Trạng thái",
        key: "orderStatus",
        dataIndex: "orderStatus",
        align: "center" as const,
        render: (_: any, record: OrderItem) =>
          getStatusTag(updatedItemStatuses[record.id || ""]),
      },

      {
        title: "Chỉnh trạng thái",
        key: "action",
        align: "center" as const,
        render: (_: any, record: OrderItem) => (
          <Select
            value={updatedItemStatuses[record.id || ""]}
            size="small"
            onChange={(status) => handleStatusChange(status, record.id || "")}
            style={{ width: 130 }}
          >
            <Option value="PENDING">Chờ xác nhận</Option>
            <Option value="APPROVED">Đã duyệt</Option>
            <Option value="ONDELIVERY">Đang giao</Option>
            <Option value="DELIVERED">Hoàn thành</Option>
            <Option value="CANCELLED">Đã hủy</Option>
          </Select>
        ),
      },
    ];
    const navigate = useNavigate();
    return (
      <div style={{ padding: 24 }}>
        <Modal
          afterClose={() => navigate("/admin/order")}
          destroyOnClose
          confirmLoading={isPending}
          title={<Title level={4}>Chi tiết đơn hàng #{order?.orderCode}</Title>}
          open={modalVisible}
          onCancel={closeModal}
          footer={[
            <Button key="close" onClick={closeModal}>
              Đóng
            </Button>,
            <Button key="save" type="primary" onClick={mutate}>
              Xác nhận
            </Button>,
          ]}
          width={1000}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Text strong>Khách hàng:</Text>
              <div>{order?.client?.name}</div>
            </Col>
            <Col span={6}>
              <Text strong>Tổng tiền:</Text>
              <div>{order?.totalAmount.toLocaleString()} ₫</div>
            </Col>
            <Col span={6}>
              <Text strong>Trạng thái đơn:</Text>
              <div>{getStatusTag(updatedOrderStatus)}</div>
            </Col>
            <Col span={12}>
              <Text strong>Địa chỉ:</Text>
              <div>{order?.deliveryAddress}</div>
            </Col>
            <Col span={8}>
              <Text strong>Đặt lúc:</Text>
              <div>{formatDateTimeWithWeekday(order?.createdDate || "")}</div>
            </Col>
            <Col span={8}>
              <Text strong>Hình thức thanh toán:</Text>
              <div>{order?.methodPayment}</div>
            </Col>
          </Row>

          <Divider />

          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={12}>
              <Text strong>Chỉnh trạng thái đơn hàng:</Text>
              <Select
                value={updatedOrderStatus}
                onChange={handleChangeOrderStatus}
                style={{ width: "100%" }}
              >
                <Option value="PROCESSING">Đang xử lý</Option>
                <Option value="COMPLETED">Hoàn thành</Option>
                <Option value="CANCELLED">Đã hủy</Option>
                <Option value="PAID">Đã thanh toán</Option>
              </Select>
            </Col>
          </Row>

          <Divider />

          <Title level={5}>Danh sách sản phẩm</Title>
          <Table
            dataSource={orderitems.data?.contents}
            columns={columns}
            pagination={false}
            rowKey="id"
            style={{ marginTop: 16 }}
            size="small"
            bordered
          />
        </Modal>
      </div>
    );
  }
  return <></>;
}

export default OrderDetailAdmin;
