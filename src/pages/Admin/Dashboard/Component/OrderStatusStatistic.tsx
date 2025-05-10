import { Col } from "antd";
import { Card } from "@/components";
import { Clock, Truck, CheckCircle, XCircle, RotateCcw } from "lucide-react";

const statuses = [
  {
    title: "Đơn đang chờ",
    icon: Clock,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
    value: 100,
  },
  {
    title: "Đơn đang giao",
    icon: Truck,
    iconColor: "text-orange-500",
    bgColor: "bg-orange-50",
    value: 45,
  },
  {
    title: "Đơn thành công",
    icon: CheckCircle,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
    value: 320,
  },
  {
    title: "Đơn bị huỷ",
    icon: XCircle,
    iconColor: "text-gray-500",
    bgColor: "bg-gray-100",
    value: 12,
  },
  {
    title: "Đơn hoàn trả",
    icon: RotateCcw,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
    value: 8,
  },
];

function OrderStatusStatistics() {
  return (
    <>
      {statuses.map((item, index) => {
        const Icon = item.icon;
        return (
          <Col span={8} key={index} className="mb-4">
            <Card
              title={
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-medium">{item.title}</h4>
                  <div className={`rounded-full p-1.5 ${item.bgColor}`}>
                    <Icon size={32} className={item.iconColor} />
                  </div>
                </div>
              }
            >
              <h1 className="text-2xl font-bold text-gray-700">{item.value}</h1>
            </Card>
          </Col>
        );
      })}
    </>
  );
}

export default OrderStatusStatistics;
