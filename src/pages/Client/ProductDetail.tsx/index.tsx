import { Divider, Button, Link } from "@/components";
import { Tag } from "antd";
import { History, Phone, ShieldCheck, Truck } from "lucide-react";
import CarouselShow from "./src/Carousel";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/apis/product.api";
import { getCategoryById } from "@/apis/category.apis";
import Item from "antd/es/list/Item";
import { toast } from "react-toastify";

function ProductDetail() {
  const { id } = useParams();
  if (typeof id === "string" && id) {
    const { data, isLoading } = useQuery({
      queryKey: ["getProductById", id],
      queryFn: () => getProductById(id || ""),
    });
    const product = data?.data.data;

    const handleAddCart = () => {
      toast.success("Thêm giỏ hàng thành công. ");
      let cart: { id: string; quantity: number }[] = [];

      try {
        const stored = localStorage.getItem("cart");
        cart = stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error(
          "Dữ liệu trong localStorage bị lỗi, đang reset lại giỏ hàng.",
        );
        cart = [];
      }

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ id: id!, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    };
    const navigate = useNavigate();

    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          {product && <CarouselShow productId={id}></CarouselShow>}

          <div className="mt-10 border-t-1 border-b-1 border-gray-300 p-2">
            <h4>Điện máy PTIT cam kết</h4>
            <div className="mt-2 flex flex-col gap-2">
              <p className="flex items-center gap-2">
                <Truck className="text-primary inline" size={32} />
                Giao hàng tận nơi và nhanh chóng
                <Link to="cc" className="text-primary">
                  Xem chi tiết
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="text-primary inline" size={32} />
                Bảo hành chính hãng 1 năm tại các trung tâm bảo hành hãng
                <Link to="cc" className="text-primary">
                  Xem địa chỉ bảo hành
                </Link>
              </p>
              <p className="flex items-center gap-2">
                <History className="text-primary inline" size={32} />
                Hư gì đổi nấy 12 tháng tại 2959 siêu thị toàn quốc (miễn phí
                tháng đầu)
                <Link to="cc" className="text-primary">
                  Xem chi tiết
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-3 flex-col">
          <h3 className="min-h-10 text-gray-800">{product?.name}</h3>
          <div className="flex items-center gap-1">
            <span>No.00913939</span>
            <Divider type="vertical" />
            <span className="text-primary">0 Đánh giá</span>
            <Divider type="vertical" />
            <span className="text-primary">0 Bình luận</span>
          </div>

          <div className="mt-4 flex items-end gap-2 bg-gray-100 p-2">
            <span className="text-2xl text-red-500">
              {product?.promotionPrice.toLocaleString()} <sup>đ</sup>
            </span>
            <del className="text-gray-400">
              1{product?.sellingPrice.toLocaleString()} <sup>đ</sup>
            </del>
            <Tag color="red" className="self-center">
              -40%
            </Tag>
          </div>

          {/* <div className="my-4 flex gap-4">
            <h4>Màu sắc: </h4>
            <div className="grid grid-cols-3 gap-2">
              <Button active>Đỏ</Button>
              <Button>Đen</Button>
              <Button>Xanh</Button>
              <Button>Vàng</Button>
            </div>
          </div> */}

          <div className="border-primary-200 mt-4 rounded-xl border-1 p-2">
            <h4>Khuyến mãi</h4>
            <div className="list-decimal px-2">
              <li>Giảm 10% cho đơn hàng đầu tiên</li>
              <li>Tặng kèm quà trị giá 150.000đ cho đơn từ 1.000.000đ</li>
              <li>Miễn phí vận chuyển toàn quốc</li>
              <li>Ưu đãi 50.000đ khi đăng ký thành viên mới</li>
              <li>Giảm thêm 5% khi mua từ 2 sản phẩm trở lên</li>
              <li>Nhận mã giảm 20% cho lần mua tiếp theo</li>
            </div>
          </div>
          <div className="border-primary-200 mt-6 rounded-xl border-1 p-2">
            <h4>Phương thức thanh toán</h4>
            <div className="list-decimal px-2">
              <li>VNPAY</li>
              <li>Momo</li>
              <li>Zalo Pay</li>
              <li>Thanh toán khi nhận hàng</li>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap justify-between gap-2">
            <Button variant="outlined" color="primary" onClick={handleAddCart}>
              Thêm giỏ hàng
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={() => {
                handleAddCart();
                navigate("/cart");
              }}
            >
              Mua ngay
            </Button>
            <Button variant="solid" className="flex-1" color="red">
              Trả góp ngay 0%
            </Button>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Phone className="fill-primary"></Phone>
            Gọi ngay <strong className="text-primary">0389801058</strong> để
            được tư vấn miễn phí
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;
