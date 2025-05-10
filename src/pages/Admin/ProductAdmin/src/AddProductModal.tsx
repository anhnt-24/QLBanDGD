import { Button, Input, ModalForm } from "@/components";
import { UploadOutlined } from "@ant-design/icons";
import { ChildrenPropsType } from "@/types";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createProduct } from "@/apis/product.api";
import { getAllCategoryForSelect } from "@/apis/category.apis";
import { Option } from "antd/es/mentions";
const AddProductModal = ({
  openModal,
  setClose,
  refetch,
}: ChildrenPropsType) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createProduct(formData),
    onSuccess: (data) => {
      toast.success(data.data.status?.message);
      setClose();
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.status?.detail);
    },
  });
  const handleAdd = (productRequest: any) => {
    const formData = new FormData();
    productRequest.thumbnail = productRequest.thumbnail[0].originFileObj;
    Object.keys(productRequest).forEach((key) => {
      formData.append(key, productRequest[key]);
    });
    mutate(formData);
  };

  const { data } = useQuery({
    queryKey: ["selectCategory"],
    queryFn: () => getAllCategoryForSelect(),
  });
  const listCategory = data?.data.data;
  return (
    <div>
      <ModalForm
        confirmLoading={isPending}
        onFinish={handleAdd}
        setOpen={setClose}
        open={openModal === "add"}
        title="Thêm sản phẩm"
      >
        <Input
          name="name"
          label="Tên sản phẩm"
          required
          placeholder="Tên sản phẩm"
        />
        <div className="flex gap-2">
          <Input
            name="brand"
            label="Thương hiệu"
            required
            placeholder="Thương hiệu"
          ></Input>

          <Input
            name="categoryId"
            label="Danh mục"
            required
            type="Select"
            placeholder="-- Vui lòng chọn --"
            showSearch
            filterOption={(input: string, option: any) =>
              (option?.children ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
          >
            {listCategory ? (
              listCategory.map((item, index) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))
            ) : (
              <></>
            )}
          </Input>
        </div>

        <Input
          label="Mô tả"
          name="description"
          placeholder="Mô tả"
          type="TextArea"
        />
        <div className="flex gap-2">
          <Input
            addonAfter="VND"
            label="Giá nhập"
            name="importPrice"
            number
            placeholder="Giá nhập"
            required
          />
          <Input
            addonAfter="VND"
            label="Giá bán"
            number
            name="sellingPrice"
            placeholder="Giá bán"
            required
          />
          <Input
            addonAfter="VND"
            number
            label="Giá khuyến mãi"
            name="promotionPrice"
            placeholder="Giá khuyến mãi"
          />
        </div>
        <div className="flex gap-2">
          <Input label="Đã bán" number name="sold" placeholder="Đã bán" />
          <Input
            label="Số lượng hiện tại"
            required
            number
            name="stock"
            placeholder="Số lượng"
          />
        </div>
        <Input
          type="Upload"
          label="Ảnh hiển thị"
          required
          name="thumbnail"
          listType="picture"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
          maxCount={1}
          beforeUpload={() => false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
        </Input>
      </ModalForm>
    </div>
  );
};

export default AddProductModal;
