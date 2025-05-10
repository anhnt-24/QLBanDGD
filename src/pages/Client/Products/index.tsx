import { ProductList } from "@/components";
import Filter from "./src/Filter";
import Sort from "./src/Sort";
import Tags from "./src/Tags";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProduct } from "@/apis/product.api";
import { useNavigate, useLocation, data } from "react-router";
import { Product } from "@/types/Product/Product.type"; // thêm dòng này nếu có
import { ArrowDown } from "lucide-react";

function Products() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hasMore, setHasMore] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query") || "";
  if (query) {
    const [filter, setFilter] = useState({
      paging: {
        page: 1,
        size: 20,
        orders: {},
      },
      isDeleted: false,
      name: query,
    });

    const [productList, setProductList] = useState<Product[]>([]); // <- sửa ở đây

    useEffect(() => {
      setFilter((prev) => ({
        ...prev,
        name: query,
        paging: {
          ...prev.paging,
          page: 1,
        },
      }));
      setProductList([]);
    }, [query]);

    const handleSort = (sortBy: string, sortOrder: "asc" | "desc") => {
      setFilter((prev) => ({
        ...prev,
        paging: {
          ...prev.paging,
          page: 1,
          orders: {
            [sortBy]: sortOrder,
          },
        },
      }));
      setProductList([]);
    };

    const handleFilter = (minPrice: number, maxPrice: number) => {
      setFilter((prev) => ({
        ...prev,
        paging: {
          ...prev.paging,
          page: 1,
        },
        minPrice,
        maxPrice,
      }));
      setProductList([]);
    };

    const productQuery = useQuery({
      queryKey: ["searchProduct", filter],
      queryFn: () => getAllProduct(filter),
      enabled: !!query,
    });
    const paging = productQuery.data?.data.data?.paging;
    useEffect(() => {
      const data = productQuery.data?.data?.data?.contents || [];
      if (filter.paging.page === 1) {
        setProductList(data);
      } else {
        setProductList((prev) => [...prev, ...data]);
      }
      if (data.length < filter.paging.size) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }

      if (data.length === 1 && filter.paging.page === 1) {
        navigate(`/product/${data[0].id}`);
      }
    }, [productQuery.data]);

    const handleLoadMore = () => {
      setFilter((prev) => ({
        ...prev,
        paging: {
          ...prev.paging,
          page: prev.paging.page + 1,
        },
      }));
    };
    return (
      <div className="relative flex gap-4 py-2">
        <Filter onFilterChange={handleFilter} />
        <div className="flex-1 py-2">
          <Sort onSortChange={handleSort} />
          <Tags />
          <p className="pt-4">
            Tìm thấy <strong>{paging?.totalRecord}</strong> kết quả với từ khoá{" "}
            <strong>{query}</strong>
          </p>
          <ProductList
            className="!grid-cols-2 lg:!grid-cols-4"
            data={productList}
          />
          {hasMore && paging?.totalRecord && (
            <div className="mt-4 text-center">
              <button
                onClick={handleLoadMore}
                className="text-primary hover:bg-primary-50 border-primary rounded border bg-white px-4 py-2"
              >
                <ArrowDown className="mr-1 inline"></ArrowDown>
                Xem thêm {paging?.totalRecord - productList.length} sản phẩm
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Products;
