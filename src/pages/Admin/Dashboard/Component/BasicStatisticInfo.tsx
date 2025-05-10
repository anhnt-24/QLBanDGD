import {
  getLowStocks,
  getOrderNumsByWeek,
  getRevenueMonthly,
  getRevenueWeekLy,
} from "@/apis/dashboard.api";
import { Card, Link } from "@/components";
import { Col } from "antd";
import {
  ArrowDownIcon,
  ArrowRight,
  ArrowUpIcon,
  BellRing,
  Eye,
  HandCoins,
  ShoppingBasket,
} from "lucide-react";
import { useEffect, useState } from "react";

function BasicStatisticInfo() {
  const [lowStock, setLowStock] = useState(0);
  const [monthlyRevenues, setMonthlyRevenues] = useState<any>([]);
  const [numOrder, setNumOrder] = useState(0);

  useEffect(() => {
    getLowStocks().then((data) => setLowStock(data.data.low_stock_count));
    getRevenueMonthly().then((data) => setMonthlyRevenues(data.data.slice(-2)));
    getOrderNumsByWeek().then((data) => console.log(data.data));
  }, []);
  return (
    <>
      <Col span={6}>
        <Card
          title={
            <div className="flex items-center justify-between">
              <h4 className="flex">Lượt truy cập</h4>
              <Eye
                className="rounded-full bg-red-50 p-1.5 text-red-500"
                size={32}
              />
            </div>
          }
        >
          <Link className="absolute top-15 right-2">
            <ArrowRight />
          </Link>
          <h2 className="text-4xl text-gray-600">1000</h2>
          <p className="text-right text-gray-400">Lượt / tháng</p>
          <p className="mt-2 text-gray-700">
            <ArrowUpIcon className="inline text-green-500" /> Tăng 50% so với
            tháng trước
          </p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title={
            <div className="flex items-center justify-between">
              <h4 className="flex">Doanh thu</h4>
              <HandCoins
                className="rounded-full bg-green-50 p-1.5 text-green-500"
                size={32}
              />
            </div>
          }
        >
          <Link className="absolute top-15 right-2">
            <ArrowRight />
          </Link>
          <h2 className="text-4xl text-gray-600">
            {(monthlyRevenues[1]?.total_revenue / 1000000).toLocaleString(
              "vi-VN",
            )}{" "}
          </h2>
          <p className="text-right text-gray-400">Triệu đồng</p>
          <p className="mt-2 text-gray-700">
            {monthlyRevenues.length >= 2 &&
              (() => {
                const current = monthlyRevenues[1]?.total_revenue || 0;
                const previous = monthlyRevenues[0]?.total_revenue || 0;
                const diff = current - previous;
                const percentage =
                  previous > 0 ? Math.round((diff / previous) * 100) : 0;

                if (diff > 0) {
                  return (
                    <span className="text-green-500">
                      <ArrowUpIcon className="inline" /> Tăng {percentage}% so
                      với tháng trước
                    </span>
                  );
                } else if (diff < 0) {
                  return (
                    <span className="text-red-500">
                      <ArrowDownIcon className="inline" /> Giảm{" "}
                      {Math.abs(percentage)}% so với tháng trước
                    </span>
                  );
                } else {
                  return (
                    <span className="text-gray-500">
                      Không thay đổi so với tháng trước
                    </span>
                  );
                }
              })()}
          </p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title={
            <div className="flex items-center justify-between">
              <h4 className="flex">Đơn hàng tuần này</h4>
              <ShoppingBasket
                className="rounded-full bg-blue-50 p-1.5 text-blue-500"
                size={32}
              />
            </div>
          }
        >
          <Link className="absolute top-15 right-2">
            <ArrowRight />
          </Link>
          <h2 className="text-4xl text-gray-600">
            {numOrder.toLocaleString("vi-VN")}
          </h2>
          <p className="text-right text-gray-400">Đơn</p>
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title={
            <div className="flex items-center justify-between">
              <h4 className="flex">Sản phẩm sắp hết</h4>
              <BellRing
                className="rounded-full bg-yellow-50 p-1.5 text-yellow-500"
                size={32}
              />
            </div>
          }
        >
          <Link className="absolute top-15 right-2">
            <ArrowRight />
          </Link>
          <h2 className="text-4xl text-gray-600">{lowStock}</h2>
          <p className="text-right text-gray-400">Sản phẩm</p>
        </Card>
      </Col>
    </>
  );
}

export default BasicStatisticInfo;
