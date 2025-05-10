import { ArrowRight, Ticket } from "lucide-react";
import { Button, Input, ModalForm } from "@/components";
import { Form, Modal } from "antd";
import { useState } from "react";
import Search from "antd/es/input/Search";
function Voucher() {
  const [formValues, setFormValues] = useState<any>();
  const [open, setOpen] = useState(false);

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    setFormValues(values);
    setOpen(false);
  };
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-[100%] justify-between bg-gray-50 p-2 hover:bg-gray-100"
      >
        <p className="flex items-center">
          <Ticket className="text-primary mr-1 inline" size={20}></Ticket>
          Sử dụng mã giảm giá:
        </p>
        <ArrowRight size={20} />
      </button>
      <Modal
        open={open}
        title="Mã giảm giá "
        okButtonProps={{ autoFocus: true, htmlType: "submit" }}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <div className="text-center">
          <Search
            placeholder="Nhập mã giảm giá/ Phiếu mua hàng"
            enterButton="Áp dụng"
            allowClear
          ></Search>
          <img
            className="mx-auto my-4 h-70"
            src="
        https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-voucher.a2d4304060af9e430fe3770ed.png"
            alt=""
          />
          <h3>Mã giảm giá trống</h3>
          <p>Vui lòng nhập mã giảm giá vào thanh bên trên</p>
        </div>
      </Modal>
    </>
  );
}

export default Voucher;
