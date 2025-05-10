import { Button, Input } from "@/components";
import { Form, Modal, Select, Upload, UploadFile, Space, Flex } from "antd";
import { memo, useEffect, useState } from "react";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import {
  createAnh,
  createChiTietSanPham,
  createSanPham,
} from "@/apis/product.api";
import { toast } from "react-toastify";
import { ChildrenPropsType } from "@/types";
function AddProduct({ refresh }: ChildrenPropsType) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log("cc");
    setIsModalOpen(true);
  };
  const handleOk = async (values: any) => {
    const sanpham = await createSanPham(values);
    const chiTietSanPham = values.chitietsanpham.map((val: Object) => ({
      ...val,
      sanphamId: sanpham?.data.id,
    }));
    await createChiTietSanPham(chiTietSanPham);
    const formData = new FormData();
    formData.append("sanphamId", sanpham.data.id);
    fileList.forEach((fileObj) => {
      if (fileObj.originFileObj) {
        formData.append("imgList", fileObj.originFileObj);
      }
    });
    createAnh(formData);
    refresh();
    setIsModalOpen(false);
    toast.success("Thêm sản phẩm thành công!");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        color="primary"
        variant="solid"
        className="!min-h-8"
        icon={<PlusOutlined></PlusOutlined>}
      >
        Thêm mới
      </Button>
      <Modal
        title="Thêm sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{
          autoFocus: true,
          htmlType: "submit",
          style: { borderRadius: 1 },
          icon: <PlusOutlined></PlusOutlined>,
        }}
        cancelButtonProps={{
          style: { borderRadius: 1 },
        }}
        width={600}
        okText="Thêm"
        cancelText="Hủy"
        destroyOnClose
        modalRender={(dom) => (
          <Form
            onFinish={(values) => handleOk(values)}
            layout="vertical"
            labelWrap
            clearOnDestroy
          >
            {dom}
          </Form>
        )}
      >
        <div className="flex justify-between gap-2">
          <Input
            flex="1"
            label="Tên sản phẩm"
            name="ten"
            rules={[{ required: true, message: "Bắt buộc" }]}
            placeholder="Tên sản phẩm"
          />
          <Input
            flex="1"
            label="Phân loại"
            name="loai"
            rules={[{ required: true, message: "Bắt buộc" }]}
            placeholder="Phân loại"
          />
        </div>
        <Input
          label="Giá"
          name="gia"
          rules={[
            { required: true, message: "Bắt buộc" },
            { pattern: /^[0-9]+$/, message: "Chỉ được nhập số" },
          ]}
          placeholder="Giá"
        />
        <Input placeholder="Mô tả" />
        <Form.Item
          label="Ảnh hiển thị"
          name="image"
          required={true}
          rules={[
            {
              validator: () =>
                fileList.length > 0
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("Bạn phải tải lên ít nhất một ảnh"),
                    ),
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            listType="picture-card"
            maxCount={10}
            onChange={({ fileList }) => setFileList(fileList)} // Cập nhật danh sách file
          >
            <button
              style={{
                color: "inherit",
                cursor: "inherit",
                border: 0,
                background: "none",
              }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}> Tải lên</div>
            </button>
          </Upload>
        </Form.Item>
        <Form.List
          name="chitietsanpham"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length < 1) {
                  return Promise.reject(
                    new Error("Phải có ít nhất một biến thể"),
                  );
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map(({ key, name }) => (
                <Space key={key} style={{ display: "flex" }} align="baseline">
                  <Input
                    name={[name, "kichco"]}
                    rules={[{ required: true, message: "Bắt buộc" }]}
                    placeholder="Kích cỡ"
                  />
                  <Input
                    name={[name, "mausac"]}
                    rules={[{ required: true, message: "Bắt buộc" }]}
                    placeholder="Màu sắc"
                  />

                  <Input
                    name={[name, "soluong"]}
                    rules={[
                      { required: true, message: "Bắt buộc" },
                      { pattern: /^[0-9]+$/, message: "Chỉ được nhập số" },
                    ]}
                    placeholder="Số lượng"
                  />
                  {fields.length > 1 && (
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  )}
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm biến thể
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Modal>
    </>
  );
}

export default AddProduct;
