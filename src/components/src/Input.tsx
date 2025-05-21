import { ChildrenPropsType } from "@/types";
import { Input as InputANTD, message, Rate, Select, Upload } from "antd";
import { Form } from "antd";
function Input({
  children,
  label,
  rules,
  flex,
  name,
  type,
  required,
  number,
  valuePropName,
  getValueFromEvent,

  ...props
}: ChildrenPropsType) {
  let Component: any = InputANTD;
  if (type === "Select") Component = Select;
  if (type === "TextArea") Component = InputANTD.TextArea;
  if (type === "Upload") Component = Upload;
  if (type === "Rate") Component = Rate;

  let Rules: any = [];
  if (rules) Rules = [...rules];
  if (required) Rules = [...Rules, { required: true, message: "Bắt buộc." }];
  if (number)
    Rules = [...Rules, { pattern: /^[0-9]+$/, message: "Chỉ được nhập số" }];
  return (
    <div className="flex flex-1 flex-col">
      <p className="py-1 text-sm">
        {required && <span className="text-red-500">* </span>}
        {label}
      </p>
      <Form.Item
        required={required}
        rules={Rules}
        name={name}
        style={{
          marginBottom: 8,
          flex: 1,
        }}
        valuePropName={valuePropName}
        getValueFromEvent={getValueFromEvent}
      >
        <Component {...props} name={name} style={{ borderRadius: 0 }}>
          {children}
        </Component>
      </Form.Item>
    </div>
  );
}

export default Input;
