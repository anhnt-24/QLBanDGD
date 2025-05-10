import { ChildrenPropsType } from "@/types";
import { Divider as DividerATND } from "antd";

function Divider({ ...props }: ChildrenPropsType) {
  return (
    <DividerATND
      style={{ margin: "2px 0", backgroundColor: "gray", opacity: 0.5 }}
      className="!bg-gray-200"
      {...props}
    />
  );
}

export default Divider;
