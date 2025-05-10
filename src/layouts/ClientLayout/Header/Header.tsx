import { Button, Link } from "@/components";
import { Divider, Avatar, Tooltip } from "antd";
import {
  MenuSquareIcon,
  Package2,
  Phone,
  ShoppingCart,
  User,
} from "lucide-react";
import Categories from "./Categories";
import Cart from "./Cart";
import HeaderSearch from "./HeaderSearch";
import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "@/apis/category.apis";
import { useState } from "react";

function Header() {
  const [filter, setFilter] = useState({
    paging: {
      page: 1,
      size: 10,
    },
    isDeleted: false,
  });
  const category = useQuery({
    queryKey: ["searchCategory", filter],
    queryFn: () => getAllCategory(filter),
  });

  const categoryList = category.data?.data.data?.contents || [];
  return (
    <>
      <div className="bg-primary-400 z-20 hidden h-10 shrink items-center justify-between px-10 text-3xl font-bold text-white md:flex lg:px-[15%]">
        <p className="flex items-center gap-2 font-semibold">
          <Phone size={18} />
          Hotline: 0389801058
        </p>

        <div className="flex items-center gap-2">
          <Tooltip title="Tiếng Việt">
            <button>
              <Avatar src="/assets/vietnamflag.png"></Avatar>
            </button>
          </Tooltip>

          <Tooltip title="Tiếng Anh">
            <button>
              <Avatar src="/assets/usflag.png"></Avatar>
            </button>
          </Tooltip>

          <Divider type="vertical" className="bg-gray-400"></Divider>
          <button>Giới thiệu</button>
          <Divider type="vertical" className="bg-gray-400"></Divider>
          <button>Hỗ trợ</button>
        </div>
      </div>

      <div className="sticky top-0 z-20 flex items-center justify-between bg-white px-10 !shadow-xs shadow-gray-200 not-lg:flex-col not-lg:py-2 lg:px-[15%]">
        <Link
          to="/"
          className="text-primary min-w-50 !text-3xl font-bold italic"
        >
          Điện Máy PTIT
        </Link>
        <div className="flex items-center gap-4">
          <Categories />
          <HeaderSearch></HeaderSearch>
        </div>
        <div className="hidden items-center gap-8 md:flex">
          <Link to="/order">
            <Package2 size={16} /> Đơn hàng
          </Link>
          <Cart />
        </div>
      </div>
      <div className="bg-primary-50 sticky top-0 flex h-8 items-center justify-center gap-8 px-10 lg:px-[15%]">
        {categoryList.map((category) => (
          <Link to={`/search?query=${category.name}`} className="text-primary">
            {category.name}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Header;
