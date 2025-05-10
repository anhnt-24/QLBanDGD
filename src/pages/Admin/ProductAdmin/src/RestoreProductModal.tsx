import { restoreCategoryByListId } from "@/apis/category.apis";
import { restoreProductByListId } from "@/apis/product.api";
import { ModalForm } from "@/components";
import { ChildrenPropsType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { CircleAlert } from "lucide-react";
import { toast } from "react-toastify";

function RestoreProductModal({
  openModal,
  setClose,
  refetch,
  listId,
}: ChildrenPropsType) {
  const { mutate, isPending } = useMutation({
    mutationFn: () => restoreProductByListId(listId),
    onSuccess: (data) => {
      toast.success(data?.data?.status?.message);
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
        open={openModal === "restore"}
        title={
          <h4 className="flex items-center gap-1">
            <CircleAlert className="inline text-yellow-500" size={18} />
            Khôi phục sản phẩm
          </h4>
        }
      >
        <p>Sản phẩm sẽ được khôi phục và hiển thị ở trang chủ. </p>
      </ModalForm>
    </>
  );
}

export default RestoreProductModal;
