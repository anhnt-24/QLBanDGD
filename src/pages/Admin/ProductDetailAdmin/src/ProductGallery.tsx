import {
  Upload,
  message,
  Image,
  Button,
  Popconfirm,
  Spin,
  Typography,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { UploadProps } from "antd";
import {
  createProductImage,
  getProductImages,
  deleteProductImage,
} from "@/apis/productImage.api";
import type { ProductImage } from "@/types/ProductImage.type";
import { ChildrenPropsType } from "@/types";

const ProductGallery = ({ productId }: ChildrenPropsType) => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["productImages", productId],
    queryFn: () => getProductImages(productId).then((res) => res.data),
  });

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => createProductImage(formData),
    onSuccess: () => {
      message.success("Tải ảnh thành công!");
      queryClient.invalidateQueries({ queryKey: ["productImages", productId] });
    },
    onError: () => message.error("Lỗi khi tải ảnh"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProductImage(id),
    onSuccess: () => {
      message.success("Đã xoá ảnh");
      queryClient.invalidateQueries({ queryKey: ["productImages", productId] });
    },
    onError: () => message.error("Lỗi khi xoá ảnh"),
  });

  const handleUpload: UploadProps["customRequest"] = async ({
    file,
    onSuccess,
    onError,
  }) => {
    if (!(file as File).type.startsWith("image/")) {
      message.error("Chỉ được tải ảnh!");
      onError?.(new Error("Không phải ảnh"));
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("image", file);

    try {
      setUploading(true);
      await uploadMutation.mutateAsync(formData);
      onSuccess?.("ok");
    } catch (e) {
      onError?.(new Error("Lỗi khi upload"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Upload
        showUploadList={false}
        customRequest={handleUpload}
        beforeUpload={() => true}
      >
        <Button
          type="dashed"
          icon={<PlusOutlined />}
          loading={uploading}
          style={{ marginBottom: 16 }}
        >
          Tải ảnh lên
        </Button>
      </Upload>

      {isLoading ? (
        <Spin />
      ) : (
        <Image.PreviewGroup>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
              gap: 8,
            }}
          >
            {data?.data &&
              data?.data.map((img: ProductImage) => (
                <div key={img.id} style={{ position: "relative" }}>
                  <Image
                    src={img.url}
                    width={120}
                    height={120}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                  />
                  <Popconfirm
                    title="Xoá ảnh này?"
                    onConfirm={() => deleteMutation.mutate(img.id)}
                    okText="Xoá"
                    cancelText="Huỷ"
                  >
                    <Button
                      type="primary"
                      danger
                      shape="circle"
                      icon={<DeleteOutlined />}
                      size="small"
                      style={{
                        position: "absolute",
                        top: 6,
                        right: 6,
                        background: "rgba(255,255,255,0.85)",
                        border: "none",
                      }}
                    />
                  </Popconfirm>
                </div>
              ))}
          </div>
        </Image.PreviewGroup>
      )}
    </div>
  );
};

export default ProductGallery;
