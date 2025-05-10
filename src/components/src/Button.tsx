import { ChildrenPropsType } from "@/types";
import { Button as ButtonANTD } from "antd";
import { Check, TicketCheck } from "lucide-react";

function Button({
  children,
  to,
  onClick,
  img,
  icon,
  active,
  ...props
}: ChildrenPropsType) {
  return (
    <ButtonANTD
      icon={icon}
      onClick={onClick}
      style={{
        borderRadius: "1px",
        fontSize: "2rem",
        font: "0.3rem",
      }}
      className="relative"
      {...props}
    >
      {img ? <img src={img}></img> : ""}
      {children}
      {active && (
        <div className="border-primary absolute h-[100%] w-[100%] border-1">
          <div className="border-primary absolute right-0 border-8 border-b-transparent border-l-transparent"></div>
          <Check className="absolute top-0 -right-0 text-white" size={10} />
        </div>
      )}
    </ButtonANTD>
  );
}

export default Button;
