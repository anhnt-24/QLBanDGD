import { Doughnut } from "react-chartjs-2";
import { Col } from "antd";
import { Card } from "@/components";
import { plugins, ChartOptions } from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { getTop5Products } from "@/apis/dashboard.api";

function Top5Product() {
  const options: ChartOptions<"doughnut"> = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 20,
          padding: 10,
          usePointStyle: false,
        },
      },
    },
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getTop5Product"],
    queryFn: () => getTop5Products(),
  });

  const Top5Product = data?.data;
  const dataSource = {
    labels: Top5Product?.map((item: any) => item.product_name) || [],
    datasets: [
      {
        label: "Đã bán",
        data: Top5Product?.map((item: any) => item.total_quantity_sold) || [],
        backgroundColor: [
          "#4E79A7",
          "#F28E2B",
          "#E15759",
          "#76B7B2",
          "#59A14F",
        ],
        borderColor: ["#4E79A7", "#F28E2B", "#E15759", "#76B7B2", "#59A14F"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Col span={24}>
      <Card loading={isLoading} title={<h4>Top 5 sản phẩm bán chạy nhất</h4>}>
        <Doughnut
          options={options}
          className="!h-[100%] !w-[100%]"
          data={dataSource}
        />
      </Card>
    </Col>
  );
}

export default Top5Product;
