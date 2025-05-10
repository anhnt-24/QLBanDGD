import TableAdminProduct from "@/components/src/TableAdminProduct";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { Popconfirm } from "antd";
import { toast } from "react-toastify";
import { PencilLine, Trash2 } from "lucide-react";
import AddProductModal from "./src/AddProductModal";
import { deleteProductById, getAllProduct } from "@/apis/product.api";
import DeleteProductModal from "./src/DeleteProductModal";
import UpdateProductModal from "./src/UpdateProductModal";
import { Product, ProductFilter } from "@/types/Product/Product.type";
import { Outlet } from "react-router";
import { Link } from "@/components";
import { useTableFilter } from "@/hooks/useTableFilter";
import { useTableSearch } from "@/hooks/useTableSearch";

function ProductAdmin() {
  const { filter, setFilter, handleTableChange } =
    useTableFilter<ProductFilter>({
      paging: {
        page: 1,
        size: 10,
        orders: {},
      },
      name: "",
    });
  const { getColumnSearchProps } = useTableSearch(setFilter);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["listProduct", filter],
    queryFn: () => getAllProduct(filter),
  });

  const dataSource = data?.data?.data;
  const paging = dataSource?.paging;
  const [openModal, setOpenModal] = useState("");
  const [id, setId] = useState<string>("");
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<any> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleCloseModal = () => {
    setOpenModal("");
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_: any, __: any, index: number) => {
        return (filter.paging.page - 1) * filter.paging.size + index + 1;
      },
      align: "center",
      width: "40px",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => (
        <Link to={`/admin/product/${record.id}`} className="text-primary">
          {text}
        </Link>
      ),
      sorter: true,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Ảnh hiển thị",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text: string) => <img src={text} alt="thumbnail" width={150} />,
      align: "center",
      width: "150px",
    },

    {
      title: "Thương hiệu",
      dataIndex: "brand",
      align: "center",
      key: "brand",
      sorter: true,
      ...getColumnSearchProps("brand"),
    },
    {
      title: "Giá bán (₫)",
      dataIndex: "sellingPrice",
      key: "sellingPrice",
      render: (price: number) =>
        price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
      align: "center",
      width: "130px",
      sorter: true,
    },
    {
      title: "Giá khuyến mãi (₫)",
      dataIndex: "promotionPrice",
      key: "promotionPrice",
      render: (price: number) =>
        price
          ? price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })
          : "-",
      align: "center",
      sorter: true,
    },
    {
      title: "Giá nhập (₫)",
      dataIndex: "importPrice",
      key: "importPrice",
      render: (price: number) =>
        price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
      align: "center",
      sorter: true,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      align: "center",
      sorter: true,
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
      align: "center",
      sorter: true,
    },

    {
      title: "Hành Động",
      key: "action",
      width: "100px",
      align: "center",
      render: (row: any) => (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => {
              setId(row.id);
              setOpenModal("update");
            }}
          >
            <PencilLine color="green" size={18} />
          </button>
          <Popconfirm
            placement="left"
            title="Chuyển vào thùng rác"
            onConfirm={async () => {
              await deleteProductById(row.id, false);
              refetch();
            }}
            description={
              <p>
                Danh mục này sẽ bị chuyển vào thùng rác <br />
                và sẽ không hiển thị trên trang chủ
              </p>
            }
            okText="Ok"
            cancelText="Hủy"
          >
            <button>
              <Trash2 color="red" size={18}></Trash2>
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <TableAdminProduct
        onChange={handleTableChange}
        filterSearch
        loading={isLoading}
        quantity={paging?.totalRecord}
        onClickAdd={() => setOpenModal("add")}
        onClickDelete={() => {
          if (selectedRowKeys.length > 0) setOpenModal("delete");
          else toast.info("Vui lòng chọn các mục để xóa.");
        }}
        onClickRefresh={() => refetch()}
        onClickExport={() => 2}
        toTrashBin="/admin/trash/product"
        countTrash="1"
        title="Danh sách sản phẩm"
        dataSource={dataSource?.contents}
        columns={columns}
        rowSelection={rowSelection}
        pagination={{
          current: paging?.pageNumber,
          pageSize: paging?.pageSize,
          total: paging?.totalPage,
          onChange: (page: number, pageSize: number) => {
            setFilter((prev: any) => ({
              ...prev,
              paging: {
                ...prev.paging,
                page,
                size: pageSize,
              },
            }));
          },
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }}
      />
      <AddProductModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
      />
      <DeleteProductModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        isDelete={false}
        title="Các mục bên dưới sẽ bị chuyển vào thùng rác."
      />
      <UpdateProductModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        id={id}
      />
      <Outlet></Outlet>
    </>
  );
}

export default ProductAdmin;
