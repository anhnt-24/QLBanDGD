import { getProductById } from "@/apis/product.api";
import { useQuery } from "@tanstack/react-query";
import { Descriptions, Modal, Image, Tag, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductGallery from "./src/ProductGallery";
import { getCategoryById } from "@/apis/category.apis";

function ProductDetailAdmin() {
  const { id } = useParams();
  if (typeof id === "string" && id) {
    const { data, isLoading } = useQuery({
      queryKey: ["getProductById", id],
      queryFn: () => getProductById(id || ""),
    });
    const product = data?.data.data;

    const categoryData = useQuery({
      queryKey: ["getCategoryById", product?.categoryId],
      queryFn: () => {
        if (!product?.categoryId) throw new Error("categoryId không tồn tại");
        return getCategoryById(product.categoryId);
      },

      enabled: !!product?.categoryId,
    });
    const [open, setOpen] = useState(true);
    useEffect(() => {
      if (typeof id == "string") setOpen(true);
    }, [id]);
    const handleClose = () => {
      setOpen(false);
    };
    const navigate = useNavigate();
    return (
      <Modal
        loading={isLoading}
        open={open}
        footer={null}
        onCancel={handleClose}
        title={<h4 style={{ marginBottom: 0 }}>Chi tiết sản phẩm</h4>}
        width={700}
        destroyOnClose
        afterClose={() => navigate("/admin/product")}
      >
        <div className="flex max-h-150 flex-col gap-4 overflow-auto pr-2">
          <div className="text-center">
            {typeof product?.thumbnail == "string" && (
              <Image
                width={250}
                src={product?.thumbnail}
                alt="Ảnh sản phẩm"
                style={{ borderRadius: 6 }}
                preview={true}
              />
            )}
          </div>

          <Descriptions bordered size="small" column={2}>
            <Descriptions.Item span={4} label={"ID"}>
              {product?.id}
            </Descriptions.Item>
            <Descriptions.Item span={4} label={"Tên sản phẩm"}>
              {product?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Loại">
              {categoryData.data?.data.data?.name}
            </Descriptions.Item>
            <Descriptions.Item label="Thương hiệu">
              {product?.brand}
            </Descriptions.Item>

            <Descriptions.Item label="Giá nhập">
              {product?.importPrice} ₫
            </Descriptions.Item>
            <Descriptions.Item label="Giá bán">
              {product?.sellingPrice} ₫
            </Descriptions.Item>
            <Descriptions.Item label="Giá khuyến mãi">
              {product?.promotionPrice} ₫
            </Descriptions.Item>
            <Descriptions.Item label="Tình trạng">
              {product?.isDeleted ? (
                <Tag color="red">Đã xóa</Tag>
              ) : (
                <Tag color="green">Đang hoạt động</Tag>
              )}{" "}
            </Descriptions.Item>
            <Descriptions.Item label="Kho">{product?.stock}</Descriptions.Item>
            <Descriptions.Item label="Đã bán">
              {product?.sold}
            </Descriptions.Item>

            <Descriptions.Item label="Mô tả" span={2}>
              {product?.description}
            </Descriptions.Item>
          </Descriptions>
          <h4>Thư viện ảnh sản phẩm</h4>
          <ProductGallery productId={product?.id} />
          <div>
            <Form></Form>
          </div>
          {/* <h4>Lịch sử mua hàng</h4>
          <div className="max-h-100 min-h-100 overflow-y-auto rounded-lg bg-gray-100 p-4 shadow-inner">
            <div className="divide-y divide-gray-300 text-sm">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-gray-800">
                    <strong>Khách:</strong> Nguyễn Văn A
                  </p>
                  <p className="text-gray-600">
                    Mã đơn hàng:{" "}
                    <span className="font-medium">ádsajsdfkndsjkfnd</span>{" "}
                  </p>
                  <p className="text-gray-600">
                    Ngày mua: <span className="font-medium">12/04/2025</span> |
                    Số lượng: <span className="font-medium">2</span>
                  </p>
                </div>
                <span className="font-medium text-green-600">Đã giao</span>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-gray-800">
                    <strong>Khách:</strong> Trần Thị B
                  </p>
                  <p className="text-gray-600">
                    Mã đơn hàng:{" "}
                    <span className="font-medium">09/04/2025</span>{" "}
                  </p>
                  <p className="text-gray-600">
                    Ngày mua: <span className="font-medium">09/04/2025</span> |
                    Số lượng: <span className="font-medium">1</span>
                  </p>
                </div>
                <span className="font-medium text-yellow-600">Đang giao</span>
              </div>
            </div>
          </div> */}
        </div>
      </Modal>
    );
  }
  return <></>;
}

export default ProductDetailAdmin;
