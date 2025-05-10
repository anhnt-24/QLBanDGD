import { Link } from "@/components";
import { Tag } from "antd";
import { X } from "lucide-react";

function Tags() {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {/* {Array.from({ length:  }, (_, i) => i + 1).map(() => (
        <Tag color="blue">
          <p className="py-1 text-xs text-gray-700">
            Nguyễn Tuấn Anh
            <button className="pl-1">
              <X className="inline" size={12}></X>
            </button>
          </p>
        </Tag>
      ))}
      <Link to="cc" className="text-red-500">
        Xóa tất cả
      </Link> */}
    </div>
  );
}

export default Tags;
