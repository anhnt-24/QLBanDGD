import { Button, Input, ModalForm } from "@/components";
import { UploadOutlined } from "@ant-design/icons";
import { ChildrenPropsType } from "@/types";
import {
  createCategory,
  getAllCategoryForSelect,
  getCategoryById,
  updateCategory,
} from "@/apis/category.apis";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById, updateProduct } from "@/apis/product.api";
import { Option } from "antd/es/mentions";
const UpdateProductModal = ({
  openModal,
  setClose,
  refetch,
  id,
}: ChildrenPropsType) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateProduct(formData),
    mutationKey: ["getProductById", id],
    onSuccess: () => {
      toast.success("Thành công.");
      setClose();
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["getProductById", id],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data.status?.detail);
    },
  });
  const handleUpadte = (categoryRequest: any) => {
    const formData = new FormData();

    categoryRequest.thumbnail = categoryRequest.thumbnail[0].originFileObj;
    if (categoryRequest.thumbnail == undefined)
      categoryRequest.thumbnail = new Blob();
    console.log(categoryRequest);
    categoryRequest.id = id;
    Object.keys(categoryRequest).forEach((key) => {
      formData.append(key, categoryRequest[key]);
    });
    mutate(formData);
  };
  const { data, isLoading } = useQuery({
    queryKey: ["getCategoryById", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  const dataSource = data?.data.data;
  if (typeof dataSource?.thumbnail === "string")
    dataSource.thumbnail = [
      {
        uid: "-1",
        name: "product.png",
        status: "done",
        thumbUrl: dataSource?.thumbnail,
      },
    ];
  const { data: listCategoryForSelect } = useQuery({
    queryKey: ["selectCategory"],
    queryFn: () => getAllCategoryForSelect(),
  });
  const listCategory = listCategoryForSelect?.data.data;
  if (isLoading) return <p></p>;

  return (
    <div>
      <ModalForm
        confirmLoading={isPending}
        onFinish={handleUpadte}
        setOpen={setClose}
        data={dataSource}
        open={openModal === "update"}
        title="Cập nhật sản phẩm"
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
            name="sellingPrice"
            placeholder="Giá bán"
            required
            number
          />
          <Input
            addonAfter="VND"
            label="Giá khuyến mãi"
            name="promotionPrice"
            placeholder="Giá khuyến mãi"
            number
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
        </Input>{" "}
      </ModalForm>
    </div>
  );
};

export default UpdateProductModal;
