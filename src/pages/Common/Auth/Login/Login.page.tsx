import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Checkbox, Form, Flex, Input, Divider } from "antd";
import { Button } from "@/components";
import { data, Link, useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "@/config/firebase/firebase.config";
import "react-google-signin-button/dist/button.css";
import { getMyInfo, login, loginWithGoogle } from "@/apis/account.api";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import {
  Account,
  AuthContextType,
  GoogleAuthenRequest,
} from "@/types/Account/type.account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
const googleProvider = new GoogleAuthProvider();

const LoginPage = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginData = useMutation({
    mutationFn: (loginRequest: Account) => login(loginRequest),
    onSuccess: (data) => {
      const token = data.data.data?.token;
      if (token) localStorage.setItem("token", token);
      toast.success("Đăng nhập thành công.");
    },
    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu không đúng.");
    },
  });
  const googleLogin = useMutation({
    mutationFn: (googleAuthenRequest: GoogleAuthenRequest) =>
      loginWithGoogle(googleAuthenRequest),
    onSuccess: (data) => {
      const token = data.data.data?.token;
      if (token) localStorage.setItem("token", token);
      toast.success("Đăng nhập thành công.");
    },
  });
  const myinfo = useQuery({
    queryKey: ["getMyInfo"],
    queryFn: () => getMyInfo().then((data) => data.data.data),
    enabled: !!loginData.data || !!googleLogin.data,
  });
  useEffect(() => {
    const handleLogin = async () => {
      if (myinfo.data) {
        const authData: AuthContextType["auth"] = {
          id: myinfo.data?.id,
          name: myinfo.data?.name,
          role: myinfo.data?.role,
        };
        localStorage.setItem("auth", JSON.stringify(authData));
        setAuth(authData);
      }
    };
    handleLogin();
  }, [myinfo.data]);
  const onFinish = (loginRequest: Account) => loginData.mutate(loginRequest);

  const handleGoogleAuth = async () => {
    const data = await signInWithPopup(firebaseAuth, googleProvider);

    const user = data.user;
    const ggToken = await user.getIdToken();
    const name = user.displayName || "";
    const email = user.email || "";
    const avatar = user.photoURL || "";
    const googleAuthenRequest: GoogleAuthenRequest = {
      ggToken,
      name,
      email,
      avatar,
    };
    googleLogin.mutate(googleAuthenRequest);
    console.log(googleAuthenRequest);
  };

  return (
    <Form name="login" initialValues={{ remember: true }} onFinish={onFinish}>
      <h2 className="block h-20 content-center text-center">Đăng nhập</h2>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email." },
          { type: "email", message: "Định dạng email không hợp lệ." },
        ]}
      >
        <Input
          variant="underlined"
          prefix={<UserOutlined />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mặt khẩu." }]}
      >
        <Input
          variant="underlined"
          prefix={<LockOutlined />}
          type="password"
          placeholder="Mật khẩu"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Nhớ mật khẩu</Checkbox>
          </Form.Item>
          <Link to="/auth/forget-password">Quên mật khẩu?</Link>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button className="mb-3" block type="primary" htmlType="submit">
          Đăng nhập
        </Button>
        {/* hoặc <Link to="/auth/register">Đăng kí ngay</Link> */}
      </Form.Item>
      <Divider className="!mb-3 !border-gray-400 !text-gray-400">Hoặc</Divider>
      <Form.Item>
        <div className="flex items-center justify-center">
          <Button
            className="mr-4 !h-12 !w-12 !rounded-[100%] border-2 !p-2"
            img="/assets/google-icon.png"
            onClick={handleGoogleAuth}
          />
          <Button
            className="!h-12 !w-12 !rounded-[100%] border-2 !p-2"
            img="/assets/facebook.png"
            onClick={handleGoogleAuth}
          />
        </div>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;
