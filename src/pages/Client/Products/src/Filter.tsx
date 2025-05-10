import { Button, Divider, Input } from "@/components";
import { ChildrenPropsType } from "@/types";
import { Menu, Radio, Slider } from "antd";
import { FilterIcon } from "lucide-react";
import { useEffect, useState } from "react";

function Filter({ onFilterChange }: ChildrenPropsType) {
  // State to track selected price range
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(5000000);
  const [customRange, setCustomRange] = useState<boolean>(false);

  useEffect(() => {
    applyFilters();
  }, [selectedPriceRange, minPrice, maxPrice]);

  const handlePriceRangeChange = (value: string) => {
    setSelectedPriceRange(value);
    setCustomRange(false);

    if (value === "all") {
      setMinPrice(0);
      setMaxPrice(5000000);
    } else if (value === "under2mil") {
      setMinPrice(0);
      setMaxPrice(2000000);
    } else if (value === "2to4mil") {
      setMinPrice(2000000);
      setMaxPrice(4000000);
    }
  };

  const handleSliderChange = (value: [number, number]) => {
    setCustomRange(true);
    setSelectedPriceRange("custom");
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setCustomRange(true);
      setSelectedPriceRange("custom");
      setMinPrice(value);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setCustomRange(true);
      setSelectedPriceRange("custom");
      setMaxPrice(value);
    }
  };

  const applyFilters = () => {
    if (onFilterChange) {
      onFilterChange(minPrice, maxPrice);
    }
  };

  return (
    <div className="sticky top-35 left-0 h-fit w-75 bg-gray-100 not-md:hidden lg:top-15">
      <h3 className="p-2 text-gray-800">
        <FilterIcon className="mr-1 inline" size={18} />
        Bộ lọc tìm kiếm
      </h3>
      <Divider className="bg-gray-200"></Divider>
      <div className="flex p-2">
        <Menu
          selectable={false}
          style={{ backgroundColor: "transparent" }}
          mode="inline"
          defaultOpenKeys={["price"]}
        >
          <Menu.SubMenu
            key="price"
            style={{ padding: "0 !important" }}
            title={<h4>Mức giá</h4>}
          >
            <Menu.Item
              style={{ borderRadius: "0" }}
              className="!rounded-0 !h-auto !bg-transparent !p-0"
            >
              <div className="flex flex-col gap-2">
                <Radio
                  checked={selectedPriceRange === "all"}
                  onChange={() => handlePriceRangeChange("all")}
                >
                  <p>Tất cả</p>
                </Radio>
                <Radio
                  checked={selectedPriceRange === "under2mil"}
                  onChange={() => handlePriceRangeChange("under2mil")}
                >
                  <p>Dưới 2 triệu</p>
                </Radio>
                <Radio
                  checked={selectedPriceRange === "2to4mil"}
                  onChange={() => handlePriceRangeChange("2to4mil")}
                >
                  <p>Từ 2-4 triệu</p>
                </Radio>
              </div>
              <div>
                <h4 className="mt-2 text-sm">
                  Hoặc nhập khoảng giá phù hợp với bạn:
                </h4>
                <div className="mt-2 px-1">
                  <div className="-mb-2 flex gap-2">
                    <Input
                      type="number"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      placeholder="Từ"
                    />
                    <span className="-translate-y-1">~</span>
                    <Input
                      type="number"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      placeholder="Đến"
                    />
                  </div>

                  <Slider
                    range={{ draggableTrack: true }}
                    min={0}
                    max={5000000}
                    step={100000}
                    value={[minPrice, maxPrice]}
                    onChange={(values: any) => handleSliderChange(values)}
                  />
                </div>
              </div>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    </div>
  );
}

export default Filter;
