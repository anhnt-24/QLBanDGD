import CategoryList from "./src/CategoryList";
import ProminentCategories from "./src/ProminentCategories";
import SliderShow from "./src/Slider";
import SuggestedProducts from "./src/SuggestedProducts";
import SliderShow2 from "./src/SliderShow2";
import { getAllCategory } from "@/apis/category.apis";
import { CategoryFilter } from "@/types/Category/Category.type";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function HomePage() {
  const [filter, setFilter] = useState<PagingRequest<CategoryFilter>>({
    paging: {
      page: 1,
      size: 15,
      orders: {},
    },
    name: "",
    isDeleted: false,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["getAllCategory", filter],
    queryFn: () => getAllCategory(filter),
  });
  const category = data?.data.data;
  return (
    <div>
      <SliderShow />
      <div className="mt-4 flex flex-col gap-4">
        {category && <CategoryList data={category} />}
        {/* <RecentViews /> */}
        <div className="-mx-4">
          <img src="assets/banner3.png" alt="" />
        </div>
        {category && <ProminentCategories data={category} />}

        <SliderShow2 />
        <SuggestedProducts />
      </div>
    </div>
  );
}

export default HomePage;
