import { getAllGuest } from "@/apis/guest.api";
import { ChildrenPropsType } from "@/types";
import { Guest, GuestFilter } from "@/types/Guest.type";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge } from "antd";
import Search from "antd/es/input/Search";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

function ListGuest({ setReceiver }: ChildrenPropsType) {
  const [filter, setFilter] = useState<PagingRequest<GuestFilter>>({
    paging: {
      page: 1,
      size: 20,
      orders: {},
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["getAllGuest"],
    queryFn: () => getAllGuest(filter),
  });

  const [guestList, setGuestList] = useState<Guest[]>([]);
  useEffect(() => {
    setGuestList(data?.data.data?.contents || []);
  }, [data?.data]);
  return (
    <div className="bg-white p-4 px-8">
      <div className="flex items-center gap-2 border-b-1 border-gray-200 p-4 px-6 pt-0">
        <Avatar style={{ backgroundColor: "orange" }} icon={<User />} />
        <h4>Admin</h4>
      </div>

      <Search
        placeholder="Tìm kiếm"
        variant="filled"
        className="my-2"
        enterButton
      />
      <div className="max-h-150 overflow-auto">
        {guestList.map((item: Guest) => (
          <div
            className="flex cursor-pointer items-center gap-2 border-gray-200 p-3 px-6 pr-20 hover:bg-gray-50"
            onClick={() => setReceiver(item)}
          >
            <Avatar
              style={{ backgroundColor: `${item.color}` }}
              icon={<User />}
            />

            <Badge
              dot
              color={item.unread ? "blue" : "transparent"}
              offset={[18, 9]}
            >
              <div>
                <h4>{item.name}</h4>
                <p className="text-xs text-gray-400">{item.phone}</p>
              </div>
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListGuest;
