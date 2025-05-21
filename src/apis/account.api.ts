import { Account, GoogleAuthenRequest } from "./../types/Account/type.account";
import { ApiResponse } from "@/types";
import { http, instance } from "../config";
import { LoginResponse } from "@/types/Account/type.account";

export const register = (account: Account) =>
  http.post<ApiResponse<LoginResponse>>("/auth/register", account);

export const login = (account: Account) =>
  http.post<ApiResponse<LoginResponse>>("/auth/login", account);

export const refresh = () =>
  http.get<ApiResponse<LoginResponse>>("/auth/refresh");

export const logout = () => http.post<ApiResponse<string>>("/auth/logout");

export const getMyInfo = () =>
  instance.get<ApiResponse<Account>>("/auth/myinfo");

export const loginWithGoogle = (googleAuthenRequest: GoogleAuthenRequest) =>
  http.post<ApiResponse<LoginResponse>>(
    "/auth/google/login",
    googleAuthenRequest,
  );
