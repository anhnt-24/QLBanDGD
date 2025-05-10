import React, { useEffect, useState } from "react";
import { FloatButton, Layout, theme } from "antd";
import Header from "./Header/Header";
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import { Breadcrumb, Chat } from "@/components";
import { MessageOutlined } from "@ant-design/icons";
import ChatForm from "./ChatForm";

const { Content } = Layout;

const CLientLayout: React.FC = () => {
  const [guestId, setGuestId] = useState<any>(undefined);
  useEffect(() => setGuestId(localStorage.getItem("guest") || ""), []);

  return (
    <Layout>
      <FloatButton.Group
        trigger="click"
        style={{ insetInlineEnd: 24 }}
        icon={<MessageOutlined></MessageOutlined>}
      >
        {guestId ? (
          <Chat senderId={guestId}></Chat>
        ) : (
          <ChatForm setGuestId={(id: any) => setGuestId(id)}></ChatForm>
        )}
      </FloatButton.Group>
      <Header />
      <Layout className="px-10 lg:px-[15%]">
        <Breadcrumb></Breadcrumb>

        <Content className="!bg-white">
          <div className="min-h-205 bg-white px-4 py-2">
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Footer />
    </Layout>
  );
};

export default CLientLayout;
