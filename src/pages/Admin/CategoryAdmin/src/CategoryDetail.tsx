import { getCategoryById } from "@/apis/category.apis";
import { getAllProduct } from "@/apis/product.api";
import { Link } from "@/components";
import { ChildrenPropsType } from "@/types";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { ProductFilter } from "@/types/Product/Product.type";
import { formatLocalDate } from "@/utils/DateTime";
import { useQuery } from "@tanstack/react-query";
import { Modal, Tag } from "antd";
import { useState } from "react";

function CategoryDetail({ id, openModal, setClose }: ChildrenPropsType) {
  const category = useQuery({
    queryKey: ["getCategory", id],
    queryFn: () => getCategoryById(id),
    enabled: !!id,
  });
  const filter: PagingRequest<ProductFilter> = {
    paging: {
      page: 1,
      size: 10,
      orders: {},
    },
    categoryId: id,
  };
  const product = useQuery({
    queryKey: ["listProduct", filter],
    queryFn: () => getAllProduct(filter),
  });

  const categoryData = category.data?.data?.data;
  const productData = product.data?.data?.data;
  if (category.isLoading && product.isLoading) return <></>;

  return (
    <>
      <Modal
        className="!w-150"
        open={openModal === "detail"}
        onCancel={setClose}
        footer={null}
        title={<h4>Chi tiết danh mục sản phẩm</h4>}
      >
        <div className="flex items-center gap-4">
          {typeof categoryData?.thumbnail === "string" ? (
            <img
              src={categoryData?.thumbnail || "/assets/product.png"}
              className="mr-2 h-25"
              alt=""
            />
          ) : (
            <img src={"/assets/product.png"} className="mr-2 h-25" alt="" />
          )}
          <div>
            <div>
              <label htmlFor="" className="text-sm font-semibold">
                ID:{" "}
              </label>
              <span>{categoryData?.id} </span>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-semibold">
                Tên danh mục:{" "}
              </label>
              <span>{categoryData?.name} </span>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-semibold">
                Số lượng sản phẩm:{" "}
              </label>
              <span>{productData?.contents.length} </span>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-semibold">
                Trạng thái:{" "}
              </label>
              <span>
                {categoryData?.isDeleted ? (
                  <Tag color="red">Đã xóa</Tag>
                ) : (
                  <Tag color="green">Đang hoạt động</Tag>
                )}
              </span>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-semibold">
                Ngày tạo:{" "}
              </label>
              <span>{formatLocalDate(categoryData?.createdDate || "")} </span>
            </div>
            <div>
              <label htmlFor="" className="text-sm font-semibold">
                Cập nhật lúc:{" "}
              </label>
              <span>
                {formatLocalDate(categoryData?.lastModifiedDate || "")}{" "}
              </span>
            </div>
          </div>
        </div>
        <h4 className="mt-4">Danh sách sản phẩm của "{categoryData?.name}"</h4>
        <div className="mt-4 flex max-h-100 min-h-80 flex-col space-y-2 overflow-auto bg-gray-100 p-2">
          {productData?.contents.length ? (
            productData?.contents.map((value) => (
              <Link
                to={`/admin/product/${value.id}`}
                className="flex rounded-xs bg-white p-2 hover:bg-gray-50"
              >
                {typeof value.thumbnail === "string" && (
                  <img src={value.thumbnail} className="h-15" alt="" />
                )}

                <div className="ml-2">
                  <p>{value.name}</p>
                  <p className="space-x-2">
                    <strong className="text-red-500">
                      {value.promotionPrice.toLocaleString()}đ
                    </strong>
                    <del className="text-xs text-gray-500">
                      {value.sellingPrice.toLocaleString()}đ
                    </del>
                    <Tag color="red" className="inline">
                      -43%
                    </Tag>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>Không có sản phẩm nào.</p>
          )}
        </div>
      </Modal>
    </>
  );
}

export default CategoryDetail;
