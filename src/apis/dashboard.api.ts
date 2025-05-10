import { ngrok } from "@/config/axios/axios";

export const getRevenueWeekLy = () => ngrok.get("/revenue/weekly");

export const getRevenueMonthly = () => ngrok.get("/revenue/monthly");
export const getRevenueYearly = () => ngrok.get("/revenue/yearly");
export const getTop5Products = () => ngrok.get("/top-products");
export const getTopCustomers = () => ngrok.get("/top-customers");
export const getLowStocks = () => ngrok.get("/low-stock-count");
export const getStatusStats = () => ngrok.get("/order-status-stats");
export const getOrderNumsByWeek = () => ngrok.get("/orders-last-week");
