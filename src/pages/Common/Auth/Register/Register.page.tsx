import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  CheckSquareOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Form, Checkbox, Input } from "antd";
import { Button } from "@/components";
import { Link } from "react-router";
import { RegisterRequest } from "@/types";
import { register } from "@/apis/account.api";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";

function RegisterPage() {
  const { setAuth } = useAuth();
  const onFinish = (registerRequest: RegisterRequest) => {
    register(registerRequest)
      .then((data) => {
        toast.success("Đăng kí thành công");
      })
      .catch(() => toast.error("Thất bại"));
  };
  return (
    // Form login
    <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
      {/* Tiêu đề */}
      <h2 className="block h-20 content-center text-center">Đăng kí</h2>

      {/*Tên tài khoản*/}
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập tài khoản của bạn" }]}
      >
        <Input
          variant="underlined"
          prefix={<UserOutlined />}
          placeholder="Tài khoản"
        />
      </Form.Item>
      {/* Mật khẩu */}
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Vui lòng nhập mặt khẩu" },
          () => ({
            validator(_, value) {
              if (!value) {
                return Promise.resolve(); // Nếu không có giá trị, không cần kiểm tra
              }
              const regexUpperCase = /(?=.*[A-Z])/; // Kiểm tra ít nhất một chữ cái viết hoa
              const regexLowerCase = /(?=.*[a-z])/; // Kiểm tra ít nhất một chữ cái viết thường
              const regexDigit = /(?=.*\d)/; // Kiểm tra ít nhất một chữ số
              const regexSpecialChar = /(?=.*[\W_])/; // Kiểm tra ít nhất một ký tự đặc biệt
              const regexLength = /^.{8,19}$/;

              // Kiểm tra từng điều kiện và trả về lỗi riêng biệt nếu không hợp lệ
              if (!regexUpperCase.test(value)) {
                return Promise.reject(
                  new Error("Mật khẩu phải có ít nhất một chữ cái viết hoa"),
                );
              }

              if (!regexLowerCase.test(value)) {
                return Promise.reject(
                  new Error("Mật khẩu phải có ít nhất một chữ cái viết thường"),
                );
              }

              if (!regexDigit.test(value)) {
                return Promise.reject(
                  new Error("Mật khẩu phải có ít nhất một chữ số"),
                );
              }

              if (!regexSpecialChar.test(value)) {
                return Promise.reject(
                  new Error("Mật khẩu phải có ít nhất một ký tự đặc biệt"),
                );
              }

              if (!regexLength.test(value)) {
                return Promise.reject(
                  new Error("Mật khẩu phải có độ dài từ 8 đến 19 ký tự"),
                );
              }

              return Promise.resolve();
            },
          }),
        ]}
      >
        <Input
          variant="underlined"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>

      {/* Xác nhận mật khẩu */}
      <Form.Item
        name="confirmPassword"
        rules={[
          { required: true, message: "Vui lòng nhập xác nhận mặt khẩu" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Xác nhận mật khẩu không khớp"));
            },
          }),
        ]}
      >
        <Input
          variant="underlined"
          prefix={<CheckSquareOutlined />}
          type="password"
          placeholder="Xác nhận mật khẩu"
        />
      </Form.Item>

      {/* Số điện thoại */}
      <Form.Item
        name="phonenumber"
        rules={[
          { required: true, message: "Vui lòng nhập số điện thoại" },
          () => ({
            validator(_, value) {
              // Số điện thoại phải có 10 kí tự và không có kí tự đặc biệt hoặc chữ cái
              const regex = /^\d{10}$/;
              if (!value || regex.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Số điện thoại không đúng định dạng"),
              );
            },
          }),
        ]}
      >
        <Input
          variant="underlined"
          prefix={<PhoneOutlined />}
          type="text"
          placeholder="Số điện thoại"
        />
      </Form.Item>

      {/* Email */}
      <Form.Item
        name={"email"}
        rules={[
          {
            type: "email",
            message: "Email không đúng định dạng",
          },
          {
            required: true,
            message: "Vui lòng nhập email",
          },
        ]}
      >
        <Input
          variant="underlined"
          prefix={<MailOutlined />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="aggree" valuePropName="checked" noStyle>
          <Checkbox>
            Đồng ý với các
            <Link className="" to="">
              Điều khoản của chúng tôi
            </Link>
          </Checkbox>
        </Form.Item>
      </Form.Item>

      {/* Button Submit */}
      <Form.Item>
        <Button className="mb-3" block type="primary" htmlType="submit">
          Đăng Kí
        </Button>
        <Link to="/auth/login" className="block text-center">
          Đã có tài khoản
        </Link>
      </Form.Item>
    </Form>
  );
}

export default RegisterPage;
