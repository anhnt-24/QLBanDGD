import { ChildrenPropsType } from "@/types";
import { Link as Linkx } from "react-router";
function Link({ children, to, style, className, ...props }: ChildrenPropsType) {
  const P = () => (
    <div
      {...props}
      style={{
        display: "flex",
        gap: "4px",
        alignItems: "center",
        lineHeight: "1.6rem",
      }}
      className={`hover:text-primary text-[0.875rem] text-gray-600 ${className}`}
    >
      {children}
    </div>
  );
  return (
    <>
      {to ? (
        <Linkx style={style} to={to}>
          <P />
        </Linkx>
      ) : (
        <P />
      )}{" "}
    </>
  );
}

export default Link;
