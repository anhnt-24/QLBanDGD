import { getAllProduct } from "@/apis/product.api";
import { Button, Link, ProductList } from "@/components";
import { ChildrenPropsType } from "@/types";
import { Category } from "@/types/Category/Category.type";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { ProductFilter } from "@/types/Product/Product.type";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

function ProminentCategories({ data }: ChildrenPropsType) {
  const [items, setItems] = useState<TabsProps["items"]>([]);
  const [filter, setFilter] = useState<PagingRequest<ProductFilter>>({
    paging: {
      page: 1,
      size: 12,
      orders: {},
    },
  });
  useEffect(() => {
    if (data?.contents) {
      const first5Items =
        data.contents?.slice(0, 5).map((item: Category) => ({
          key: item.id,
          label: item.name,
        })) || [];

      console.log(first5Items);
      setFilter((prev) => ({ ...prev, categoryId: first5Items[0].key }));
      setItems(first5Items);
    }
  }, []);

  const productData = useQuery({
    queryKey: ["listProduct", filter],
    queryFn: () => getAllProduct(filter),
    enabled: !!items,
  });
  const contents = productData?.data?.data.data?.contents || [];
  const handleChangeTab = (key: string) => {
    setFilter((prev) => ({ ...prev, categoryId: key }));
  };
  return (
    <div>
      <h4>Danh mục nổi bật</h4>
      <Tabs items={items} onChange={handleChangeTab} />
      <div className="flex flex-col justify-center gap-2">
        {contents?.length > 0 && <ProductList data={contents}></ProductList>}

        <Button
          to="cc"
          className="!text-primary bg-red-300 align-middle hover:opacity-80"
          icon={<ArrowRight size={14} />}
          iconPosition="end"
        >
          Xem thêm
        </Button>
      </div>
    </div>
  );
}

export default ProminentCategories;
