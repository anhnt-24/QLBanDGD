import { Form, Input, Button, Card, Typography } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Guest } from "@/types/Guest.type";
import { useMutation } from "@tanstack/react-query";
import { createGuest } from "@/apis/guest.api";
import { toast } from "react-toastify";
import { ChildrenPropsType } from "@/types";
import { getRandomColor } from "@/utils/GetRandomColor";

const { Title } = Typography;

function ChatForm({ setGuestId }: ChildrenPropsType) {
  const [form] = Form.useForm();
  const mutation = useMutation({
    mutationFn: (data: Guest) => createGuest(data),
    onSuccess: (res) => {
      if (typeof res.data.data?.id === "string") {
        setGuestId(res.data.data.id);
        localStorage.setItem("guest", res.data.data?.id);
      }
      toast.success("Tạo khách thành công!");
    },
    onError: () => {
      toast.error("Tạo khách thất bại");
    },
  });

  const onFinish = (values: any) => {
    mutation.mutate({
      ...values,
      color: getRandomColor(),
    });
  };

  return (
    <div
      className="-translate-x-55 translate-y-26"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Title level={4} style={{ textAlign: "center", marginBottom: 30 }}>
          Thông tin cá nhân
        </Title>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email" },
              { type: "email", message: "Email không hợp lệ" },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="abc@email.com" />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="0123456789" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              style={{ borderRadius: 8 }}
              loading={mutation.isPending}
            >
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default ChatForm;
