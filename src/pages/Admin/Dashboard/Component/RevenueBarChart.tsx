import { Col, Radio } from "antd";
import { Card } from "@/components";

import { Chart } from "react-chartjs-2";
import type { CheckboxGroupProps } from "antd/es/checkbox";
import { useQuery } from "@tanstack/react-query";
import {
  getRevenueMonthly,
  getRevenueWeekLy,
  getRevenueYearly,
} from "@/apis/dashboard.api";
import { useEffect, useState } from "react";

function RevenueBarChart() {
  const [transData, setTransData] = useState([]);

  const [timeType, setTimeType] = useState("month");
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
  };

  const labels = transData.map((item: any) => {
    const parts = [];
    if (item.week) parts.push(item.week);
    if (item.month) parts.push(item.month);
    if (item.year) parts.push(item.year);
    return parts.join("/");
  });

  const weeklyRevenue = useQuery({
    queryKey: ["getRevenueWeekly"],
    queryFn: () => getRevenueWeekLy(),
    enabled: timeType === "week",
  });
  const monthlyRevenue = useQuery({
    queryKey: ["getRevenueMonthly"],
    queryFn: () => getRevenueMonthly(),
    enabled: timeType === "month",
  });
  const yearlyRevenue = useQuery({
    queryKey: ["getRevenueYearly"],
    queryFn: () => getRevenueYearly(),
    enabled: timeType === "year",
  });

  const dataSource = {
    labels,
    datasets: [
      {
        type: "line" as const,
        label: "Doanh thu",
        borderColor: "#FF9800",
        borderWidth: 2,
        fill: false,
        data: transData?.map((item: any) => item.total_revenue) || [],
      },
      {
        type: "bar" as const,
        label: "Lợi nhuận",
        backgroundColor: "#4CAF50",
        data: transData?.map((item: any) => item.total_profit) || [],
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };
  const optionsCheckbox: CheckboxGroupProps<string>["options"] = [
    { label: "Tuần", value: "week" },
    { label: "Tháng", value: "month" },
    { label: "Năm", value: "year" },
  ];

  useEffect(() => {
    if (timeType === "week" && weeklyRevenue.data?.data) {
      setTransData(weeklyRevenue.data.data);
    } else if (timeType === "month" && monthlyRevenue.data?.data) {
      setTransData(monthlyRevenue.data.data);
    } else if (timeType === "year" && yearlyRevenue.data?.data) {
      setTransData(yearlyRevenue.data.data);
    }
  }, [timeType, weeklyRevenue.data, monthlyRevenue.data, yearlyRevenue.data]);

  const handleChangeTime = (e: any) => {
    const value = e.target.value;
    setTimeType(value);
  };
  const isLoading =
    monthlyRevenue.isLoading ||
    weeklyRevenue.isLoading ||
    yearlyRevenue.isLoading;
  return (
    <Col span={24}>
      <Card
        loading={isLoading}
        title={
          <div className="flex items-center justify-between">
            <h4>Biểu đồ doanh thu lợi nhuận</h4>
            <Radio.Group
              block
              options={optionsCheckbox}
              onChange={handleChangeTime}
              defaultValue="month"
              optionType="button"
            />
          </div>
        }
      >
        <Chart
          className="!h-full !w-full"
          type="bar"
          data={dataSource}
          options={options}
        />
      </Card>
    </Col>
  );
}

export default RevenueBarChart;
