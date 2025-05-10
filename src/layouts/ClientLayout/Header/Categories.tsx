import { Link } from "@/components";
import { Dropdown, Flex } from "antd";
import { MenuSquareIcon } from "lucide-react";

function Categories() {
  return (
    <>
      <Dropdown
        dropdownRender={() => (
          <div className="flex h-74 w-150 translate-y-1 rounded-xs bg-white shadow-xs shadow-gray-300">
            <div className="flex !w-[25%] flex-col border-t-4 border-r-4 border-b-4 border-gray-200 bg-gray-100">
              <ul className="w-[100%]">
                {Array.from({ length: 8 }, (_, i) => i + 1).map(() => (
                  <li className="hover:border-l-primary block border-b-1 border-l-2 border-gray-300 border-l-transparent py-0.5 pl-2 hover:bg-white">
                    <Link>Điện tử viễn thông</Link>
                  </li>
                ))}
              </ul>
              <div className="bg-primary-50 flex flex-1 content-center items-center justify-center hover:brightness-99">
                <Link to="cc" className="text-primary">
                  Xem thêm
                </Link>
              </div>
            </div>
            <div className="flex-1 p-2">
              <h4 className="text-xs">Chương trình hot</h4>
              <div className="mt-2 grid h-[90%] grid-cols-5 gap-4 overflow-y-auto">
                {Array.from({ length: 18 }, (_, i) => i + 1).map(() => (
                  <Link to="cc" className="!text-xs hover:bg-gray-50">
                    <div>
                      <img
                        src="assets/product.png"
                        className="mx-auto w-10"
                        alt=""
                      />
                      <p className="text-center text-xs">Máy lọc không khí</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      >
        <div>
          <Link to="cc" className="not-md:!hidden">
            <MenuSquareIcon size={16} />
            Danh Mục
          </Link>
        </div>
      </Dropdown>
    </>
  );
}

export default Categories;
