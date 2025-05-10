import { ChildrenPropsType } from "@/types";
import { Checkbox, Select } from "antd";
import { useState } from "react";
import { NavLink } from "react-router";

function Sort({ onSortChange }: ChildrenPropsType) {
  const [selectedSort, setSelectedSort] = useState("priceAsc");

  const handleSortChange = (value: string) => {
    setSelectedSort(value);
    let sortBy = "promotionPrice";
    let sortOrder = "ASC";

    if (value === "priceAsc") {
      sortBy = "promotionPrice";
      sortOrder = "ASC";
    } else if (value === "priceDesc") {
      sortBy = "promotionPrice";
      sortOrder = "DESC";
    } else if (value === "newest") {
      sortBy = "createdDate";
      sortOrder = "DESC";
    } else if (value === "highlighted") {
      sortBy = "sold";
      sortOrder = "DESC";
    }

    onSortChange(sortBy, sortOrder);
  };

  return (
    <div className="flex items-center gap-2 bg-gray-100 px-2 py-2.5 not-lg:justify-between">
      <p>Sắp xếp theo</p>
      <div className="hidden flex-wrap gap-2 lg:flex">
        <Checkbox
          checked={selectedSort === "highlighted"}
          onChange={() => handleSortChange("highlighted")}
          className="hover !text-primary !border-0 !bg-transparent"
        >
          Nổi bật
        </Checkbox>
        <Checkbox
          checked={selectedSort === "newest"}
          onChange={() => handleSortChange("newest")}
          className="!text-primary !border-0 !bg-transparent"
        >
          Mới nhất
        </Checkbox>
        <Checkbox
          checked={selectedSort === "priceAsc"}
          onChange={() => handleSortChange("priceAsc")}
          className="!text-primary !border-0 !bg-transparent"
        >
          Giá thấp nhất
        </Checkbox>
        <Checkbox
          checked={selectedSort === "priceDesc"}
          onChange={() => handleSortChange("priceDesc")}
          className="!text-primary !border-0 !bg-transparent"
        >
          Giá cao nhất
        </Checkbox>
      </div>
      <div className="float-right flex lg:hidden">
        <Select
          value={selectedSort}
          style={{ width: 200, fontSize: "14px !important" }}
          onChange={handleSortChange}
          options={[
            { value: "highlighted", label: "Nổi bật" },
            { value: "newest", label: "Mới nhất" },
            { value: "priceAsc", label: "Giá thấp nhất" },
            { value: "priceDesc", label: "Giá cao nhất" },
          ]}
        />
      </div>
    </div>
  );
}

export default Sort;
