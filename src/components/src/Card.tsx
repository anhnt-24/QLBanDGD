import { ChildrenPropsType } from "@/types";
import { Card as CardATND } from "antd";
function Card({ children, headStyle, ...props }: ChildrenPropsType) {
  return (
    <CardATND
      style={{
        borderRadius: "1px",
        width: "100%",
        height: "100%",
      }}
      {...props}
    >
      {children}
    </CardATND>
  );
}

export default Card;
