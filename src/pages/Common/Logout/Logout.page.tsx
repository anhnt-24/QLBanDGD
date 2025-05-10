import { logout } from "@/apis/account.api";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router";
import { toast } from "react-toastify";

function Logout() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const logoutData = useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      toast.success("Đăng xuất thành công.");
      localStorage.removeItem("token");
      localStorage.removeItem("auth");
      setAuth({});
      navigate("/auth/login");
    },
  });
  useEffect(() => {
    logoutData.mutate();
  }, []);
  return <></>;
}

export default Logout;
