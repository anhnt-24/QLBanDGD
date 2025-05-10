import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastReceiver = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // Kiểm tra có phải là điều hướng không

  useEffect(() => {
    if (navigationType === "PUSH" && location.state?.toastMessage) {
      toast(location.state.toastMessage, {
        type: location.state.toastType || "info",
      });
    }
  }, [location, navigationType]);

  return <ToastContainer position="top-right" autoClose={3000} />;
};

export default ToastReceiver;
