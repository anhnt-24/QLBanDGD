import { getTopCustomers } from "@/apis/dashboard.api";
import { Card } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Col } from "antd";
import { Award } from "lucide-react";

function formatCurrency(value: number): string {
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

// Badge xếp hạng theo thứ tự
const getTopBadge = (index: number) => {
  const tops = [
    { color: "from-yellow-400 to-yellow-300", label: "Top 1 🏆" },
    { color: "from-gray-400 to-gray-300", label: "Top 2 🥈" },
    { color: "from-orange-400 to-orange-300", label: "Top 3 🥉" },
    { color: "from-blue-400 to-blue-300", label: "Top 4" },
    { color: "from-purple-400 to-purple-300", label: "Top 5" },
  ];
  return (
    tops[index] || {
      color: "from-gray-300 to-gray-200",
      label: `Top ${index + 1}`,
    }
  );
};
export default function TopCustomers() {
  const { data, isLoading } = useQuery({
    queryKey: ["getTopCustomers"],
    queryFn: () => getTopCustomers(),
  });

  const customers =
    data?.data.map((item: any, i: number) => {
      return {
        id: 1,
        name: item.name,
        avatar: `https://i.pravatar.cc/100?img=${i}`,
        orders: item.num_orders,
        totalSpent: item.total_spent,
      };
    }) || [];

  return (
    <Col span={12}>
      <Card loading={isLoading} title={<h4>Top 5 Khách hàng thân thiết</h4>}>
        <ul className="space-y-4">
          {customers.map((customer: any, index: number) => {
            const badge = getTopBadge(index);
            return (
              <li
                key={customer.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center gap-2">
                  <Avatar size={48} src={customer.avatar} />
                  <div>
                    <p className="flex items-center gap-1 font-medium text-gray-800">
                      {index < 3 && (
                        <Award size={16} className="text-yellow-500" />
                      )}
                      {customer.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {customer.orders} đơn •{" "}
                      {formatCurrency(customer.totalSpent)}
                    </p>
                  </div>
                </div>

                <div
                  className={`bg-gradient-to-r ${badge.color} rounded-lg px-3 py-1 text-xs font-semibold text-white shadow-md transition-transform duration-200 hover:scale-105 sm:text-sm`}
                >
                  {badge.label}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
      /
    </Col>
  );
}
