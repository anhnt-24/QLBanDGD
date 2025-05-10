import { Col } from "antd";
import { Card } from "@/components";

import { CheckCircle, Edit, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { data } from "react-router";
import { json } from "stream/consumers";

const activities = [
  {
    id: 1,
    user: "Nguyễn Văn A",
    action: "thêm",
    content: "sản phẩm mới",
    icon: <CheckCircle className="h-5 w-5" />,
    iconColor: "bg-green-100 text-green-600",
    time: "10:15, 12/04/2025",
  },
  {
    id: 2,
    user: "Hệ thống",
    action: "cập nhật",
    content: "trạng thái đơn hàng #1234",
    icon: <Edit className="h-5 w-5" />,
    iconColor: "bg-yellow-100 text-yellow-600",
    time: "09:42, 12/04/2025",
  },
  {
    id: 3,
    user: "admin",
    action: "xóa",
    content: "người dùng Bùi Thị B",
    icon: <Trash2 className="h-5 w-5" />,
    iconColor: "bg-red-100 text-red-600",
    time: "08:30, 12/04/2025",
  },
  {
    id: 1,
    user: "Nguyễn Văn A",
    action: "thêm",
    content: "sản phẩm mới",
    icon: <CheckCircle className="h-5 w-5" />,
    iconColor: "bg-green-100 text-green-600",
    time: "10:15, 12/04/2025",
  },
  {
    id: 2,
    user: "Hệ thống",
    action: "cập nhật",
    content: "trạng thái đơn hàng #1234",
    icon: <Edit className="h-5 w-5" />,
    iconColor: "bg-yellow-100 text-yellow-600",
    time: "09:42, 12/04/2025",
  },
  {
    id: 3,
    user: "admin",
    action: "xóa",
    content: "người dùng Bùi Thị B",
    icon: <Trash2 className="h-5 w-5" />,
    iconColor: "bg-red-100 text-red-600",
    time: "08:30, 12/04/2025",
  },
  {
    id: 1,
    user: "Nguyễn Văn A",
    action: "thêm",
    content: "sản phẩm mới",
    icon: <CheckCircle className="h-5 w-5" />,
    iconColor: "bg-green-100 text-green-600",
    time: "10:15, 12/04/2025",
  },
  {
    id: 2,
    user: "Hệ thống",
    action: "cập nhật",
    content: "trạng thái đơn hàng #1234",
    icon: <Edit className="h-5 w-5" />,
    iconColor: "bg-yellow-100 text-yellow-600",
    time: "09:42, 12/04/2025",
  },
  {
    id: 3,
    user: "admin",
    action: "xóa",
    content: "người dùng Bùi Thị B ",
    icon: <Trash2 className="h-5 w-5" />,
    iconColor: "bg-red-100 text-red-600",
    time: "08:30, 12/04/2025",
  },
];

function ActivitiesStatistic() {
  return (
    <Col span={12}>
      <Card title={<h4>Hoạt động</h4>}>
        <div className="max-h-115 overflow-y-auto">
          {activities.map((item) => (
            <li
              key={item.id}
              className="flex items-start space-x-3 p-2 hover:bg-gray-100"
            >
              <div
                className={`flex-shrink-0 rounded-full p-2 ${item.iconColor}`}
              >
                {item.icon}
              </div>
              <div>
                <p className="text-sm text-gray-800">
                  <h4 className="inline">{item.user}</h4> đã{" "}
                  <span>{item.action}</span> {item.content}.
                </p>
                <p className="mt-1 text-xs text-gray-500">{item.time}</p>
              </div>
            </li>
          ))}
        </div>
      </Card>
    </Col>
  );
}

export default ActivitiesStatistic;
