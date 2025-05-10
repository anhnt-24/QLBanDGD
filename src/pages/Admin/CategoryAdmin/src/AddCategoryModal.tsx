import { Button, Input, ModalForm } from "@/components";
import { UploadOutlined } from "@ant-design/icons";
import { ChildrenPropsType } from "@/types";
import { Category } from "@/types/Category/Category.type";
import { createCategory } from "@/apis/category.apis";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

const AddCategory = ({ openModal, setClose, refetch }: ChildrenPropsType) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => createCategory(formData),
    onSuccess: () => {
      toast.success("Thành công.");
      setClose();
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.status?.detail);
    },
  });
  const handleAdd = (categoryRequest: any) => {
    const formData = new FormData();
    categoryRequest.thumbnail = categoryRequest.thumbnail[0].originFileObj;
    Object.keys(categoryRequest).forEach((key) => {
      formData.append(key, categoryRequest[key]);
    });
    mutate(formData);
  };
  return (
    <div>
      <ModalForm
        confirmLoading={isPending}
        onFinish={handleAdd}
        setOpen={setClose}
        open={openModal === "add"}
        title="Thêm danh mục sản phẩm"
      >
        <Input
          name="name"
          label="Tên danh mục"
          required
          placeholder="Tên danh mục"
        />
        <Input
          label="Mô tả"
          name="description"
          placeholder="Mô tả"
          type="TextArea"
        />
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

export default AddCategory;
