import { Col } from "antd";
import { Card } from "@/components";

import { Pie } from "react-chartjs-2";
import { useQuery } from "@tanstack/react-query";
import { getStatusStats } from "@/apis/dashboard.api";

function SuccessRatePieChart() {
  const { data, isLoading } = useQuery({
    queryKey: ["getStatusStats"],
    queryFn: () => getStatusStats(),
  });
  const order_status_stats = data?.data.order_status_stats;
  const dataSource = {
    labels: ["Thành công", "Thất bại"],
    datasets: [
      {
        data: order_status_stats?.map((item: any) => item.total) || [],
        backgroundColor: ["#26A69A", "#D81B60"],
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };
  return (
    <Col span={24}>
      <Card loading={isLoading} title={<h4>Tỉ lệ đơn thành công</h4>}>
        <Pie
          className="!h-[100%] !w-[100%]"
          data={dataSource}
          options={options}
        />
      </Card>
    </Col>
  );
}

export default SuccessRatePieChart;
