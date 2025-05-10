import { ChildrenPropsType } from "@/types";
import { Button, Layout } from "antd";
import { SidebarIcon } from "lucide-react";
import { useState } from "react";
const { Sider } = Layout;
function Sidebar({ children, ...props }: ChildrenPropsType) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  return (
    <Sider
      {...props}
      collapsed={isCollapsed}
      className={`${props.className} !top-0 !bottom-0 !bg-white shadow-xl shadow-gray-200`}
    >
      {
        <button
          className="absolute top-5 -right-10 cursor-pointer hover:opacity-70"
          onClick={() => {
            setIsCollapsed((prev) => !prev);
          }}
        >
          <SidebarIcon />
        </button>
      }
      {children}
    </Sider>
  );
}

export default Sidebar;
