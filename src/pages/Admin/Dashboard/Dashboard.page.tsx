import { Col, Flex, Row } from "antd";
import BasicStatisticInfo from "./Component/BasicStatisticInfo";
import RevenueBarChart from "./Component/RevenueBarChart";
import SuccessRatePieChart from "./Component/SuccessRatePie";
import Top5Product from "./Component/Top5Product";
import OrderStatusStatistics from "./Component/OrderStatusStatistic";
import ActivitiesStatistic from "./Component/ActivitiesStatistic";
import ComingSoonCalender from "./Component/CommingSoonCalender";
import TopCustomers from "./Component/TopCustomers";

const Dashboard = () => {
  return (
    <>
      <Flex gap={16}>
        <Row gutter={[16, 16]} style={{ flex: 6 }}>
          <BasicStatisticInfo></BasicStatisticInfo>
          <RevenueBarChart></RevenueBarChart>
        </Row>
        <Row gutter={[16, 16]} style={{ flex: 2 }}>
          <Top5Product></Top5Product>
          <SuccessRatePieChart></SuccessRatePieChart>
        </Row>
      </Flex>
      <Row gutter={[16, 16]} className="mt-4">
        <TopCustomers />
        <ActivitiesStatistic />
      </Row>
    </>
  );
};

export default Dashboard;
