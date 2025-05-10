import { deleteCategoryByListID } from "@/apis/category.apis";
import { deleteProductByListID } from "@/apis/product.api";
import { ModalForm } from "@/components";
import { ChildrenPropsType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";
import { toast } from "react-toastify";

function DeleteProductModal({
  openModal,
  setClose,
  refetch,
  listId,
  isDelete,
  title,
}: ChildrenPropsType) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteProductByListID(listId, isDelete),
    onSuccess: () => {
      toast.success("Thành công.");
      setClose();
      refetch();
    },
    onError: (error: any) => {
      toast.error(error?.response?.data.status?.detail);
    },
  });

  return (
    <>
      <ModalForm
        confirmLoading={isPending}
        onFinish={mutate}
        setOpen={setClose}
        open={openModal === "delete"}
        title={
          <h4 className="flex items-center gap-1">
            <CircleAlert className="inline text-yellow-500" size={18} />
            Xóa sản phẩm
          </h4>
        }
      >
        <p>{title} </p>
      </ModalForm>
    </>
  );
}

export default DeleteProductModal;
