import { Card, Link } from "@/components";
import { Carousel } from "antd";
import { X } from "lucide-react";

function RecentViews() {
  const handelDelete = (e: any) => {
    console.log(e);
    e.preventDefault();
  };
  return (
    <div>
      <h4> Đã xem gần đây</h4>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 12 }, (_, i) => i + 1).map(() => (
          <Link to="cc" className="flex gap-2">
            <div className="hover:border-primary hover:bg-primary-50 relative flex h-20 cursor-pointer items-center rounded-lg border-1 border-gray-200 pr-2">
              <img
                src="assets/product.png"
                className="mx-4 block h-[50%]"
                alt=""
              />
              <div>
                <p className="max-2-lines max-w-40 min-w-20 text-sm">
                  Tên sản phẩm là rất dài
                </p>
                <span className="text-sm text-red-500">Giá</span>
              </div>
              <button
                className="absolute top-1 right-1 rounded-2xl bg-gray-400"
                onClick={handelDelete}
              >
                <X size={12} className="text-gray-50"></X>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecentViews;
