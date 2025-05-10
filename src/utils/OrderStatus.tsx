import { Tag } from "antd";

export const getStatusTag = (status: string) => {
  const statusMap: Record<string, { color: string; label: string }> = {
    PENDING: { color: "blue", label: "Chờ xác nhận" },
    APPROVED: { color: "cyan", label: "Đã duyệt" },
    PROCESSING: { color: "gold", label: "Đang xử lý" },
    ONDELIVERY: { color: "purple", label: "Đang giao" },
    DELIVERED: { color: "green", label: "Đã giao" },
    CANCELLED: { color: "red", label: "Đã hủy" },
    COMPLETED: { color: "green", label: "Hoàn thành" },
    PAID: { color: "blue", label: "Đã thanh toán" },
  };

  const current = statusMap[status];

  return current ? (
    <Tag color={current.color}>{current.label}</Tag>
  ) : (
    <Tag>Không xác định</Tag>
  );
};

export const translateStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    PENDING: "Chờ xác nhận",
    APPROVED: "Đã duyệt",
    PROCESSING: "Đang xử lý",
    ONDELIVERY: "Đang giao",
    DELIVERED: "Hoàn thành",
    CANCELED: "Đã hủy",
  };

  return statusMap[status] || "Không xác định";
};
