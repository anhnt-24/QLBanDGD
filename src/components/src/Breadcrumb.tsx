import { Link, useLocation } from "react-router";
import { Breadcrumb as BreadcrumbANTD } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
function findBreadcrumbItems(pathname: string) {
  const paths: string[] = pathname.split("/");
  paths.shift();
  const foundedPaths: ItemType[] = [];
  paths.forEach((path) => {
    foundedPaths.push({
      path: "/" + path,
      title: path,
    });
  });
  return foundedPaths;
}

function Breadcrumb() {
  const location = useLocation();
  const breadcrumbItems = [
    { path: "/", title: "Trang chủ" },
    { path: "/product", title: "Sản phẩm" },
  ];
  function itemRender(
    currentRoute: ItemType,
    params: any,
    items: ItemType[],
    paths: string[],
  ) {
    const isLast = currentRoute?.path === items[items.length - 1]?.path;
    return isLast ? (
      <span>{currentRoute.title}</span>
    ) : (
      <>
        <Link to={`/${paths.join("/")}`}>{currentRoute.title}</Link>
      </>
    );
  }
  return (
    <>
      <BreadcrumbANTD
        className="!py-2"
        itemRender={itemRender}
        items={breadcrumbItems}
      />
    </>
  );
}

export default Breadcrumb;
