import React, { useEffect, useState } from "react";
import { Form, Modal, Spin } from "antd";
import { ChildrenPropsType } from "@/types";

const ModalForm = ({
  title,
  open,
  onFinish,
  children,
  setOpen,
  confirmLoading,
  data,
  loading,
  ...props
}: ChildrenPropsType) => {
  const [form] = Form.useForm();
  return (
    <>
      <Modal
        {...props}
        confirmLoading={confirmLoading}
        open={open}
        title={<h4>{title}</h4>}
        okText="Xác nhận"
        cancelText="Hủy"
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          style: {
            borderRadius: "1px",
          },
        }}
        cancelButtonProps={{
          autoFocus: true,
          style: {
            borderRadius: "1px",
          },
        }}
        onCancel={() => setOpen(false)}
        destroyOnClose
        modalRender={(dom) => (
          <Form
            initialValues={data}
            form={form}
            layout="vertical"
            name="form_in_modal"
            clearOnDestroy
            onFinish={onFinish}
          >
            {dom}
          </Form>
        )}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalForm;
