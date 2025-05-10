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

function OrderDetailClient() {
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

    const orderitems = useQuery({
      queryKey: ["getAllOrderItem", Filter],
      queryFn: () => getAllOrderItems(filter).then((data) => data?.data.data),
      enabled: !!order?.id,
    });

    const closeModal = () => {
      setModalVisible(false);
    };
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
          getStatusTag(record.orderStatus || ""),
      },
    ];
    const navigate = useNavigate();
    return (
      <div style={{ padding: 24 }}>
        <Modal
          afterClose={() => navigate("/order")}
          destroyOnClose
          title={<Title level={4}>Chi tiết đơn hàng #{order?.orderCode}</Title>}
          open={modalVisible}
          onCancel={closeModal}
          footer={null}
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
              <div>{getStatusTag(order?.status || "")}</div>
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

export default OrderDetailClient;
