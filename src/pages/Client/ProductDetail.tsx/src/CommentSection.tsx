import { useEffect, useState } from "react";
import { Modal, Button, Form, Rate, List, Divider, Pagination } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import vi from "dayjs/locale/vi";
import { Review } from "@/types/Review.type";
import { Input, ModalForm } from "@/components";
import { ChildrenPropsType } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createComment, getAllComment } from "@/apis/comment.api";
import { toast, ToastContainer } from "react-toastify";
import { PagingRequest } from "@/types/Pageable/Pageable.types";

dayjs.extend(relativeTime);
dayjs.locale(vi);

function maskPhone(phone: string): string {
  return phone.replace(/(\d{3})\d{4}(\d{3})/, "$1****$2");
}

function CommentSection({ product }: ChildrenPropsType) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 2;
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<PagingRequest<any>>({
    paging: {
      page: 1,
      size: 15,
      orders: {},
    },
    productId: product.id,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["getAllComment", filter],
    queryFn: () => getAllComment(filter),
  });
  useEffect(() => {
    setReviews(data?.data.data?.contents || []);
  }, [data]);
  const handleOpenModal = () => setIsModalOpen(true);
  console.log(data);
  const handlePageChange = (page: number, pageSize: number) => {
    setFilter((prev: any) => ({
      ...prev,
      paging: {
        ...prev.paging,
        page,
        size: pageSize,
      },
    }));
  };
  const { mutate, isPending } = useMutation({
    mutationFn: (review: Review) => createComment(review),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getAllComment", filter],
      });
      toast.success("Thành công.");
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Thất bại.");
    },
  });

  const handleComment = (values: any) => {
    mutate({ ...values, productId: product.id });
  };

  return (
    <div className="p-2">
      <h4 className="mb-4">Đánh giá sản phẩm</h4>

      <List
        dataSource={reviews}
        locale={{ emptyText: "Chưa có đánh giá nào." }}
        renderItem={(review, index) => (
          <List.Item className="mb-2 flex-col">
            <div className="w-full">
              <div className="flex items-center justify-between">
                <p>
                  {review.clientName}{" "}
                  <span className="text-xs text-gray-500">
                    {maskPhone(review.phone)}
                  </span>
                </p>
                <span className="text-xs text-gray-400">
                  {dayjs(review.createdDate).fromNow()}
                </span>
              </div>

              <div className="mt-1 text-sm text-gray-500"></div>

              <Rate disabled value={review.rating} className="mt-1" />

              <div className="mt-2 text-gray-800">{review.comment}</div>

              <div className="mt-2 flex items-center">
                <Button
                  type="text"
                  size="small"
                  icon={<LikeOutlined />}
                  onClick={() => {}}
                ></Button>
                <Divider type="vertical" />
                <p className="text-sm">Hữu ích</p>
              </div>
            </div>
          </List.Item>
        )}
      />

      <Button type="primary" className="mt-3" onClick={handleOpenModal}>
        Viết đánh giá của bạn
      </Button>

      <Pagination
        style={{ marginTop: 10, justifySelf: "center" }}
        current={filter.paging.page}
        total={reviews.length || 0}
        pageSize={filter.paging.size}
        onChange={handlePageChange}
        className="mt-4"
      />

      <ModalForm
        confirmLoading={isPending}
        title="Viết bình luận"
        open={isModalOpen}
        setOpen={() => setIsModalOpen(false)}
        onFinish={handleComment}
      >
        <div className="flex flex-col items-center justify-center">
          <img src={product.thumbnail} alt="" className="w-40 object-contain" />
          <p className="mt-4">{product.name}</p>
          <Input name="rating" type="Rate" />
        </div>
        <Input
          name="clientName"
          label="Họ và tên"
          required
          placeholder="Họ và tên"
        />
        <Input
          name="phone"
          label="Số điện thoại"
          required
          placeholder="Số điện thoại"
        />
        <Input
          name="comment"
          label="Bình luận"
          type="TextArea"
          required
          placeholder="Bình luận"
        />
      </ModalForm>
    </div>
  );
}

export default CommentSection;
