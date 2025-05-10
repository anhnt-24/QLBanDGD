import { ComponentType, JSX } from "react";

export interface RouteType {
  path: string;
  layout: JSX.Element;
  element: ComponentType;
}
