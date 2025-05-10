import type { MenuProps } from "antd";

export type MenuItemType = Required<MenuProps>["items"][number];

export const GetMenuItem = function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItemType[],
): MenuItemType {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItemType;
};
