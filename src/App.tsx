import { Navigate, Route, Routes } from "react-router";
import { CategoryAdmin, Dashboard } from "@/pages/Admin";
import { LoginPage, RegisterPage } from "./pages/Common";
import { FloatButton } from "antd";
import { Chat, RequireAuth, ToastReceiver } from "./components";
import { AdminMainLayout, AuthLayout, CLientLayout } from "./layouts";
import HomePage from "./pages/Client/Home";
import Products from "./pages/Client/Products";
import ProductDetail from "./pages/Client/ProductDetail.tsx";
import Cart from "./pages/Client/Cart/index.tsx";
import CategoryTrashBin from "./pages/Admin/CategoryAdmin/CategoryTrashBin.tsx";
import ProductAdmin from "./pages/Admin/ProductAdmin/index.tsx";
import ProductTrashBin from "./pages/Admin/ProductAdmin/ProductTrashBin.tsx";
import OrderAdmin from "./pages/Admin/OrderAdmin/index.tsx";
import CustomerAdmin from "./pages/Admin/CustomerAdmin/index.tsx";
import BlogAdmin from "./pages/Admin/BlogAdmin/index.tsx";
import ChatAdmin from "./pages/Admin/ChatAdmin/index.tsx";
import ProductDetailAdmin from "./pages/Admin/ProductDetailAdmin/index.tsx";
import OrderDetailAdmin from "./pages/Admin/OrderDetailAdmin/index.tsx";
import PublicRoute from "./components/src/PublicRoute.tsx";
import Logout from "./pages/Common/Logout/Logout.page.tsx";
import NotFound from "./pages/Common/NotFound/index.tsx";
import VnpayReturn from "./pages/Client/VnPayReturn/index.tsx";
import OrderClient from "./pages/Client/Order/index.tsx";
import OrderDetailClient from "./pages/Client/OrderDetail/index.tsx";
import CustomerDetailAdmin from "./pages/Admin/CustomerDetailAdmin/index.tsx";
import ProductDescriptionEditor from "./pages/Admin/ProductDescription/index.tsx";
import ScrollToTop from "./components/src/ScrollTop.tsx";

function App() {
  return (
    <>
      <ToastReceiver />
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth" element={<AuthLayout />}>
            <Route
              index
              element={<Navigate to="/auth/login" replace />}
            ></Route>
            <Route path="login" element={<LoginPage />}></Route>
            {/* <Route path="register" element={<RegisterPage />}></Route> */}
          </Route>
        </Route>
        <Route path="logout" element={<Logout></Logout>}></Route>

        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminMainLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="product" element={<ProductAdmin />}>
              <Route path=":id" element={<ProductDetailAdmin />}></Route>
            </Route>
            <Route
              path="product-description/:id"
              element={<ProductDescriptionEditor />}
            ></Route>

            <Route path="category" element={<CategoryAdmin />}></Route>
            <Route path="order" element={<OrderAdmin />}>
              <Route path=":id" element={<OrderDetailAdmin />}></Route>
            </Route>
            <Route path="chat" element={<ChatAdmin />}></Route>
            <Route path="blog" element={<BlogAdmin />}></Route>
            <Route path="customer" element={<CustomerAdmin />}>
              <Route path=":id" element={<CustomerDetailAdmin />}></Route>
            </Route>
            <Route path="trash">
              <Route path="category" element={<CategoryTrashBin />}></Route>
              <Route path="product" element={<ProductTrashBin />}></Route>
            </Route>
          </Route>
        </Route>
        <Route path="/" element={<CLientLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="search" element={<Products />}></Route>
          <Route path="product/:id" element={<ProductDetail />}></Route>
          <Route path="/checkVnPay" element={<VnpayReturn />}></Route>

          <Route path="cart" element={<Cart />}></Route>
          <Route path="order" element={<OrderClient />}>
            <Route path=":id" element={<OrderDetailClient />}></Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/notfound" />}></Route>
        <Route path="/notfound" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
