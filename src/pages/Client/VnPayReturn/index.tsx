import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { checkPayment } from "@/apis/payment.api";
import { toast } from "react-toastify";
const VnpayReturn = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const handleCheckPayment = async () => {
      try {
        const response = await checkPayment(params);
        toast.success(response.data.data);
      } catch (error) {
        toast.error("Thanh toán thất bại");
      }
      navigate("/order");
    };

    handleCheckPayment();
  }, [searchParams, navigate]);

  return <p>Đang xử lý thanh toán...</p>;
};

export default VnpayReturn;
