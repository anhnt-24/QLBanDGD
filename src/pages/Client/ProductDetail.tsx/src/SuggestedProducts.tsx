import { getAllProduct } from "@/apis/product.api";
import { Link, ProductList } from "@/components";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { ProductFilter } from "@/types/Product/Product.type";
import { useQuery } from "@tanstack/react-query";
import { Star, StarIcon } from "lucide-react";
import { useState } from "react";

function SuggestedProducts() {
  const [filter, setFilter] = useState<PagingRequest<ProductFilter>>({
    paging: {
      page: 1,
      size: 18,
      orders: {
        sold: "DESC",
      },
    },
  });
  const productData = useQuery({
    queryKey: ["listProduct", filter],
    queryFn: () => getAllProduct(filter),
  });
  const contents = productData?.data?.data.data?.contents || [];
  return (
    <div className="mt-20">
      <h4>Gợi ý cho bạn</h4>
      <ProductList data={contents} />
    </div>
  );
}

export default SuggestedProducts;
