import { Button, Input, ModalForm } from "@/components";
import { UploadOutlined } from "@ant-design/icons";
import { ChildrenPropsType } from "@/types";
import { Category } from "@/types/Category/Category.type";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "@/apis/category.apis";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UploadFile } from "antd";
const UpdateCategoryModal = ({
  openModal,
  setClose,
  refetch,
  id,
}: ChildrenPropsType) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: FormData) => updateCategory(formData),
    mutationKey: ["getCategoryById", id],
    onSuccess: () => {
      toast.success("Thành công.");
      setClose();
      refetch();
      queryClient.invalidateQueries({
        queryKey: ["getCategoryById", id],
      });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data.status?.detail);
    },
  });
  const handleUpdate = (categoryRequest: any) => {
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
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });

  const dataSource = data?.data.data;
  if (typeof dataSource?.thumbnail === "string")
    dataSource.thumbnail = [
      {
        uid: "-1",
        name: "category.png",
        status: "done",
        thumbUrl: dataSource?.thumbnail,
      },
    ];
  if (isLoading) return <p></p>;
  return (
    <div>
      <ModalForm
        confirmLoading={isPending}
        onFinish={handleUpdate}
        setOpen={setClose}
        data={dataSource}
        open={openModal === "update"}
        title="Cập nhật danh mục sản phẩm"
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

export default UpdateCategoryModal;
