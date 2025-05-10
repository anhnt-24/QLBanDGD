import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import "@ant-design/v5-patch-for-react-19";
const queryClient = new QueryClient();

import { ConfigProvider } from "antd";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
  LineElement,
} from "chart.js";
import { CartProvider } from "./contexts/CartContext";

// Đăng ký các thành phần cần thiết
ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
);
const themeConfig = {
  token: {
    colorPrimary: "#3bb8f6", // Màu chính
    colorSuccess: "#52c41a",
    colorWarning: "#faad14",
    colorError: "#ff4d4f",
    colorInfo: "#1890ff",
  },
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider theme={themeConfig}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  </QueryClientProvider>,
);
