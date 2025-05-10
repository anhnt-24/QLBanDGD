import { Link } from "@/components";
import { Layout, Row } from "antd";
import Search from "antd/es/input/Search";

const policy_items = [
  {
    title: "Chính sách đổi trả",
    to: "Chính sách bảo mật",
  },
  {
    title: "Điều khoản sử dụng",
    to: "Chính sách bảo mật",
  },
  {
    title: "Chính sách vận chuyển",
    to: "cc",
  },
  {
    title: "Chính sách bảo mật",
    to: "Chính sách bảo mật",
  },
];
function Footer() {
  return (
    <Layout.Footer className="!px-0 !pb-0">
      <div className="col-end-2 grid w-[100%] grid-cols-2 flex-wrap justify-between gap-3 bg-white px-10 py-10 sm:grid-cols-3 md:flex lg:px-[15%]">
        <div className="flex flex-col">
          <h4 className="mb-2 font-semibold">Chính sách</h4>
          <ul className="space-y-1 pr-2 text-sm text-gray-600">
            {policy_items.map((item) => (
              <Link to={item.to}>{item.title}</Link>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="mb-2 font-semibold">Về công ty</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <Link to="/policy/return">Giới thiệu</Link>
            <Link to="/policy/return">Tuyển dụng</Link>
            <Link to="/policy/return">Tin tức</Link>
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="mb-2 font-semibold">Thông tin khác</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <Link to="/policy/return">Câu hỏi thường gặp</Link>
            <Link to="/policy/return">Blog</Link>
            <Link to="/policy/return">Sơ đồ trang</Link>
            <Link to="/policy/return">Đánh giá từ khách hàng</Link>
          </ul>
        </div>
        <div className="flex flex-col">
          <h4 className="mb-2 font-semibold">Liên hệ</h4>
          <p className="text-sm text-gray-600">Email: support@yourstore.com</p>
          <p className="text-sm text-gray-600">Hotline: 1900 123 456</p>
          <p className="text-sm text-gray-600">
            Địa chỉ: 123 Đường ABC, TP.HCM
          </p>
          <h4 className="my-2 font-semibold">Đăng kí nhận tin</h4>
          <Search
            placeholder="Email hoặc số điện thoại"
            allowClear
            enterButton="Gửi"
            size="middle"
          />
        </div>
        <div className="flex flex-col">
          <h4 className="mb-2 font-semibold">Thanh toán</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {Array.from({ length: 5 }, (_, i) => i + 1).map((i) => (
              <div className="h-6 rounded-xs border-1 border-gray-300">
                {" "}
                <img
                  src={`/assets/footer-payment (${i}).png`}
                  className="h-[100%]"
                  alt=""
                />
              </div>
            ))}
          </div>
          <h4 className="my-2 font-semibold">Đơn vị vận chuyển</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((i) => (
              <div className="h-6 rounded-xs border-1 border-gray-300">
                {" "}
                <img
                  src={`/assets/footer-ship (${i}).png`}
                  className="h-[100%]"
                  alt=""
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout.Footer>
  );
}

export default Footer;
