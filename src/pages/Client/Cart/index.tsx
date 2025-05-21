import { Button, Link } from "@/components";
import { InputNumber, Radio, Tag } from "antd";
import {
  ArrowRight,
  Banknote,
  HelpCircleIcon,
  Landmark,
  Plus,
  Ticket,
} from "lucide-react";
import ReceiverInfor from "./src/ReceiverInfor";
import Voucher from "./src/Voucher";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { getProductById } from "@/apis/product.api";
import { Product } from "@/types/Product/Product.type";
import { OrderItem } from "@/types/OrderItem.type";
import CartItem from "./src/CartItem";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { createClient } from "@/apis/client.api";
import { Order } from "@/types/Order.type";
import { createOrder } from "@/apis/order.api";
import { createOrderItem } from "@/apis/orderitem.api";
import { createPayment } from "@/apis/payment.api";
import { useCart } from "@/hooks/useCart";

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const [paymentMethod, setPaymentMethod] =
    useState<Order["methodPayment"]>("COD");
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  console.log(paymentMethod);
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      const parsed = stored ? JSON.parse(stored) : [];
      if (parsed.length === 0) {
        navigate("/");
        toast.info("Giỏ hàng của bạn chưa có sản phẩm nào.");
      }

      setCartItems(parsed);
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await Promise.all(
        cartItems.map(async (item) => {
          const res = await getProductById(item.id);
          const product = res.data.data;

          if (product && item.quantity > product.stock) {
            item.quantity = product.stock;
          }

          return { ...product, quantity: item.quantity };
        }),
      );
      setProducts(productData);
    };

    if (cartItems.length > 0) {
      fetchProducts();
    } else {
      setProducts([]);
    }
  }, [cartItems]);

  const totalPrice = useMemo(() => {
    return products.reduce((sum, product) => {
      return sum + product.promotionPrice * product.quantity;
    }, 0);
  }, [products]);

  const handleOrder = async () => {
    try {
      const address = JSON.parse(localStorage.getItem("address") || "");
      if (address) {
        const client = await createClient(address);
        localStorage.setItem("client", client.data.data?.id || "");
        const orderRequest: Order = {
          clientId: client.data.data?.id,
          deliveryFee: 0,
          totalAmount: totalPrice,
          deliveryAddress: address.address,
          methodPayment: paymentMethod,
          status: "PROCESSING",
        };
        const order = await createOrder(orderRequest);
        const orderItemRequests: OrderItem[] = products.map((product) => ({
          orderId: order.data.data?.id,
          productId: product.id,
          quantity: product.quantity,
          totalPrice: product.quantity * product.promotionPrice,
          orderStatus: "PENDING",
        }));

        await Promise.all(
          orderItemRequests.map((item) => createOrderItem(item)),
        );
        if (paymentMethod === "COD") {
          navigate("/order");
          toast.success("Đặt hàng thành công.");
          localStorage.removeItem("cart");
        } else if (paymentMethod === "VNPAY" && order.data.data) {
          const redirectUrl =
            (await createPayment(order.data.data)).data.data || "";
          window.location.href = redirectUrl;
        }
      }
    } catch {
      toast.error("Có lỗi xảy ra.");
    }
  };
  return (
    <>
      <h3 className="border-b-1 border-gray-200 py-2">Giỏ hàng của bạn</h3>

      <div className="mt-6 flex flex-col gap-4 px-30">
        <ReceiverInfor />
        <div>
          <h4>Giỏ hàng</h4>
          {products.map((item) => (
            <CartItem
              data={item}
              setCartItems={(data: { id: string; quantity: number }[]) =>
                setCartItems(data)
              }
            />
          ))}
          <div className="mt-2 flex justify-between text-gray-600">
            <p>Tạm tính ({products.length} sản phẩm):</p>
            <p>{totalPrice.toLocaleString()} ₫</p>
          </div>
        </div>
        <div>
          <h4>Thông tin nhận hàng</h4>
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex justify-between">
              <p>Phí vận chuyển: </p>
              <p className="text-green-600">Miễn phí</p>
            </div>
            <div className="flex justify-between">
              <p>Giao bởi: </p>
              <p>
                {" "}
                Nhân viên{" "}
                <img
                  src="assets/logo-web.png"
                  className="inline h-4 w-15 border-1 border-gray-200 object-contain"
                  alt=""
                />{" "}
                , được đồng kiểm{" "}
                <Link className="!inline">
                  <HelpCircleIcon size={14} className="inline" />
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div>
          <h4>Hình thức thanh toán</h4>
          <Radio.Group
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="!mt-2 !flex list-none flex-col gap-2"
          >
            <li className="flex items-center">
              <Radio type="radio" value={"COD"} />
              <Banknote className="text-primary mr-1 inline" size={20} />
              Thanh toán khi nhận hàng
            </li>
            {/* <li className="flex items-center">
              <Radio type="radio" value={2} />
              <Landmark className="text-primary mr-1 inline" size={20} /> Chuyển
              khoản ngân hàng
            </li> */}
            <li className="flex items-center">
              <Radio type="radio" value={"VNPAY"} />
              <img
                src="assets/vnpay.png"
                className="inline h-6 w-6 object-contain"
                alt=""
              />
              Thanh toán qua VNPAY-QR
            </li>
          </Radio.Group>
        </div>
        <div className="flex flex-col gap-2 border-y-1 border-gray-200 py-2">
          <h4>Thành tiền</h4>
          <Voucher />
          <div className="mt-2 flex flex-col gap-1">
            <div className="flex justify-between">
              <p>Tổng tiền:</p>
              <p className="text-[1rem] font-bold text-red-400">
                {totalPrice.toLocaleString()}đ
              </p>
            </div>
          </div>
        </div>
        <Button color="primary" variant="solid" onClick={handleOrder}>
          Đặt hàng
        </Button>
      </div>
    </>
  );
}

export default Cart;
