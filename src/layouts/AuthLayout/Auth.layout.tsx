import { Outlet } from "react-router";

function AuthLayout() {
  return (
    <div className="flex h-dvh items-center bg-gray-300">
      <div className="hidden h-dvh w-[50%] flex-5 items-center justify-center md:flex">
        <img
          src="/assets/login_banner.svg"
          className="flex-1 lg:max-w-[50%]"
          alt=""
        />
      </div>
      <div className="h-dvh flex-4 bg-white px-6 pt-3 lg:flex-2">
        <img
          src="/assets/logo.png"
          className="mx-auto block h-60 object-contain"
        />
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
