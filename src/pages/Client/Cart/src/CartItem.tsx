import { Input } from "@/components";
import { useDebounce } from "@/hooks/useDebounce";
import { ChildrenPropsType } from "@/types";
import { Button, InputNumber, Popconfirm, Tag } from "antd";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function CartItem({ data, setCartItems }: ChildrenPropsType) {
  if (data.quantity) {
    const navigate = useNavigate();
    const [value, setValue] = useState<number>(data.quantity);
    useEffect(() => {
      setValue(data.quantity);
    }, [data]);
    const debouncedValue = useDebounce(Number(value), 500);
    const handleIncrease = () => {
      setValue((prevValue) => prevValue + 1);
    };

    const handleDecrease = () => {
      setValue((prevValue) => (prevValue > 1 ? prevValue - 1 : 1));
    };

    const handleChange = (e: any) => {
      const inputValue = e.target.value;
      if (/^\d+$/.test(inputValue) || inputValue == "") {
        setValue(inputValue);
        if (inputValue.startsWith("0")) {
          setValue(1);
        }
      }
    };
    const handleBlur = () => {
      const inputValue = Number(value);
      if (!!!inputValue || inputValue === 0) {
        setValue(1);
      }
    };
    useEffect(() => {
      if (!!debouncedValue) {
        const stored = localStorage.getItem("cart");
        if (!stored) return;

        const cart = JSON.parse(stored);
        const updatedCart = cart.map((item: any) => {
          if (item.id === data.id) {
            return {
              ...item,
              quantity: debouncedValue,
            };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
    }, [debouncedValue]);
    const handleDeleteItem = (idToDelete: string) => {
      try {
        const stored = localStorage.getItem("cart");
        if (!stored) return;

        const cart = JSON.parse(stored);
        const updatedCart = cart.filter((item: any) => item.id !== idToDelete);

        localStorage.setItem("cart", JSON.stringify(updatedCart));
        if (updatedCart.length === 0) {
          navigate("/");
          toast.info("Giỏ hàng của bạn chưa có sản phẩm nào.");
        }

        setCartItems(updatedCart);
      } catch (error) {}
    };

    return (
      <div className="relative mt-4 flex h-30 justify-between border-b-1 border-gray-200">
        <div className="flex h-20 gap-2">
          <img src={data.thumbnail} className="w-35" alt="" />
          <div>
            <p>{data.name}</p>
            <Tag color="orange">-20%</Tag>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <p className="text-red-500">
            {data.promotionPrice.toLocaleString()}
            <sup>đ</sup>
          </p>
          <p>
            <del className="text-sm text-gray-500">
              {data.sellingPrice.toLocaleString()} <sup>đ</sup>
            </del>
          </p>
        </div>
        <div className="text-primary absolute right-0 bottom-4 flex gap-3">
          <Popconfirm
            title={<p>Bạn có chắc muốn xóa sản phẩm này không?</p>}
            onConfirm={() => handleDeleteItem(data.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <button className="text-primary hover:underline">Xóa</button>
          </Popconfirm>
          <div className="flex items-center gap-1">
            <Button
              onClick={handleDecrease}
              className="text-gray-500"
              size="small"
            >
              <Minus size={12} />
            </Button>
            <Input
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              onEnter={handleIncrease}
              min={1}
              size="small"
              className="!w-20 text-center"
            />
            <Button
              icon={<Plus size={12} />}
              onClick={handleIncrease}
              className="text-gray-500"
              size="small"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
