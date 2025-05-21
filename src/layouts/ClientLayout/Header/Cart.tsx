import { getProductById } from "@/apis/product.api";
import { Button, Link } from "@/components";
import { useCart } from "@/hooks/useCart";
import { Badge, Dropdown } from "antd";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Cart() {
  const { cartItems, setCartItems } = useCart();
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      const parsed = stored ? JSON.parse(stored) : [];

      setCartItems(parsed);
    } catch {
      localStorage.removeItem("cart");
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await Promise.all(
        cartItems.slice(0, 5).map(async (item) => {
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
  return (
    <Dropdown
      dropdownRender={() => (
        <div className="relative w-98 translate-y-1 rounded-xs bg-white p-2 pb-15 shadow-xs shadow-gray-300">
          <h4 className="mb-2 text-sm">Sản phẩm mới thêm</h4>

          <ul className="min-h-60">
            {products.map((product) => (
              <li className="hover:border-l-primary hover b block h-15 border-b-1 border-l-2 border-gray-300 border-l-transparent py-0.5 pl-2 hover:bg-gray-50">
                <Link to={`/product/${product.id}`}>
                  <div className="flex w-[100%] items-center">
                    <img
                      src={product.thumbnail || ""}
                      className="h-10 w-[20%] object-contain"
                      alt=""
                    />
                    <div className="ml-2">
                      <p className="max-1-lines max-w-75">{product.name}</p>
                      <span className="text-sm text-red-400">
                        {product.promotionPrice.toLocaleString()}
                        <sup className="underline">đ</sup>
                      </span>
                      <del className="ml-2 text-xs text-gray-400">
                        {product.sellingPrice.toLocaleString()}
                        <sup className="underline">đ</sup>
                      </del>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="absolute bottom-0 left-0 flex h-14 w-98 items-center justify-between px-4">
            <p className="text-gray-500">
              {cartItems.length - products.length} sản phẩm còn lại...
            </p>
            <Button
              color="primary"
              variant="solid"
              size="middle"
              onClick={() => navigate("/cart")}
            >
              Xem giỏ hàng
            </Button>
          </div>
        </div>
      )}
    >
      <div>
        <Link to="/cart" className="group !gap-2">
          <Badge
            count={
              cartItems.length > 0 ? (
                <span className="block h-3 w-3 max-w-3 content-center rounded-xl bg-red-500 text-center text-[0.5rem] text-white">
                  {cartItems.length}
                </span>
              ) : null
            }
          >
            <ShoppingCart size={16} className="group-hover:text-primary" />
          </Badge>
          Giỏ hàng
        </Link>
      </div>
    </Dropdown>
  );
}

export default Cart;
