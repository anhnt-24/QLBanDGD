import { StarIcon } from "lucide-react";
import Link from "./Link";
import { ChildrenPropsType } from "@/types";
import { Product, ProductFilter } from "@/types/Product/Product.type";
import { Tag } from "antd";
import { calculateDiscount } from "@/utils/CaculateDiscount";

function ProductList({ className, data = [] }: ChildrenPropsType) {
  return (
    <div
      className={`${className} mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6`}
    >
      {data.length > 0 &&
        data.map((item: Product) => (
          <Link
            to={`/product/${item.id}`}
            className="group flex h-[100%] flex-col rounded-lg border-1 border-gray-200 p-2 text-sm"
          >
            <div className="flex h-40 w-[100%] items-center">
              {typeof item.thumbnail === "string" && (
                <img
                  src={item.thumbnail}
                  className="m-auto h-30 w-[80%] min-w-30 object-contain transition-transform duration-300 group-hover:translate-y-[-10px]"
                  alt=""
                />
              )}
            </div>
            <div className="w-[100%] leading-6">
              <p className="max-2-lines text-sm">{item.name}</p>
              <Tag color="orange">Online giá rẻ quá</Tag>
              <p className="pt-1"></p>

              <strong className="text-red-500">
                {item.promotionPrice.toLocaleString("vi-VN")}{" "}
                <sup className="underline">đ</sup>
              </strong>
              <div>
                <del className="text-xs text-gray-400">
                  {item.sellingPrice.toLocaleString("vi-VN")}{" "}
                  <sup className="underline">đ</sup>
                </del>
                <span className="ml-1 text-xs text-red-500">
                  {calculateDiscount(item.sellingPrice, item.promotionPrice)}
                </span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <StarIcon
                    fill="currentColor"
                    className="text-yellow-300"
                    size={12}
                  />
                  {item.rating}
                </span>
                <span className="text-xs text-gray-600">
                  Đã bán {item.sold}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ProductList;
