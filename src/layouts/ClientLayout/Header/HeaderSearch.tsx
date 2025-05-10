import { getAllCategory } from "@/apis/category.apis";
import { getAllProduct } from "@/apis/product.api";
import { Link } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Input, List } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function HeaderSearch() {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value, 500);
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    paging: {
      page: 1,
      size: 5,
    },
    isDeleted: false,
  });
  const product = useQuery({
    queryKey: ["searchProduct", filter],
    queryFn: () => getAllProduct(filter),
    enabled: !!debouncedValue,
  });
  const category = useQuery({
    queryKey: ["searchCategory", filter],
    queryFn: () => getAllCategory(filter),
    enabled: !!debouncedValue,
  });

  useEffect(() => {
    setFilter((prev) => ({ ...prev, name: debouncedValue }));
  }, [debouncedValue]);
  const handleEnter = () => {
    if (value.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(value)}`);
    }
  };
  const productList = product.data?.data.data?.contents || [];
  const categoryList = category.data?.data.data?.contents || [];
  if (product && category)
    return (
      <div className="relative">
        <Input.Search
          value={value}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onClick={() => setOpen(true)}
          onChange={(e) => {
            setValue(e.target.value);
            setOpen(true);
          }}
          onSearch={handleEnter}
          style={{ width: "400px", padding: "12px" }}
          placeholder="Tìm kiếm"
          enterButton
        />
        {open && debouncedValue && (
          <div className="absolute top-14 left-0 z-50 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="max-h-[300px] space-y-4 overflow-y-auto p-4">
              {/* Danh mục */}
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-600">
                  Danh mục
                </p>
                <ul className="space-y-2">
                  {categoryList?.length > 0 ? (
                    categoryList.map((item) => (
                      <Link
                        onClick={() => {
                          setOpen(false);

                          setValue(item.name);
                        }}
                        to={`/search?query=${item?.name}`}
                        key={item.id}
                        className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:bg-gray-100"
                      >
                        {typeof item.thumbnail == "string" && (
                          <img
                            src={item.thumbnail || "/no-img.png"}
                            alt={item.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        )}
                        <span className="text-sm text-gray-800">
                          {item.name}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      Không tìm thấy danh mục
                    </p>
                  )}
                </ul>
              </div>

              {/* Sản phẩm */}
              <div>
                <p className="mb-2 text-sm font-semibold text-gray-600">
                  Sản phẩm
                </p>
                <ul className="space-y-2">
                  {productList.length > 0 ? (
                    productList.map((item) => (
                      <Link
                        onClick={() => {
                          setOpen(false);

                          setValue(item.name);
                        }}
                        to={`/product/${item?.id}`}
                        key={item.id}
                        className="flex cursor-pointer items-center gap-2 rounded px-3 py-2 hover:bg-gray-100"
                      >
                        {typeof item.thumbnail == "string" && (
                          <img
                            src={item.thumbnail || "/no-img.png"}
                            alt={item.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-400">
                            {item.promotionPrice?.toLocaleString()} đ
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400 italic">
                      Không tìm thấy sản phẩm
                    </p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    );
}

export default HeaderSearch;
