import { ChildrenPropsType } from "./Component/index";
import { RouteType } from "./Routes/Routes.types";
import {
  RegisterRequest,
  AuthContextType,
  AuthProviderProps,
} from "./Account/type.account";

export type {
  RegisterRequest,
  RouteType,
  ChildrenPropsType,
  AuthContextType,
  AuthProviderProps,
};

export interface ApiResponse<T> {
  status?: {
    code: String | number;
    message?: String;
    type: String;
    detail?: String;
  };
  data?: T;
}
