import { getAllCategory } from "@/apis/category.apis";
import { Link } from "@/components";
import { ChildrenPropsType } from "@/types";
import { Category, CategoryFilter } from "@/types/Category/Category.type";
import { useQuery } from "@tanstack/react-query";
import { Filter, MenuIcon } from "lucide-react";
import { useState } from "react";

function CategoryList({ data }: ChildrenPropsType) {
  return (
    <div>
      <h4>Danh mục sản phẩm</h4>
      <div className="mt-2 grid grid-cols-5 gap-4 lg:grid-cols-8">
        {data?.contents.map((item: Category) => (
          <Link
            to={`/search?query=${item.name}`}
            className="hover:bg-primary-50 h-20 cursor-pointer text-center lg:h-25"
          >
            {typeof item.thumbnail === "string" && (
              <img
                src={item.thumbnail || ""}
                alt=""
                className="m-auto h-[40%] object-cover"
              />
            )}
          </Link>
        ))}
        <Link
          to={"cc"}
          className="hover:bg-primary-50 flex h-[100%] flex-col items-center justify-center align-middle"
        >
          <MenuIcon className="text-primary my-4" size={30}></MenuIcon>
          <span className="text-center text-sm !text-gray-600">
            Tất cả danh mục
          </span>
        </Link>
      </div>
    </div>
  );
}

export default CategoryList;
