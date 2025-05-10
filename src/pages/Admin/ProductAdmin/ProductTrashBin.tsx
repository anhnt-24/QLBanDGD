import TableAdminProduct from "@/components/src/TableAdminProduct";
import { TableRowSelection } from "antd/es/table/interface";
import { useState } from "react";
import { deleteCategoryById, getAllCategory } from "@/apis/category.apis";
import { useQuery } from "@tanstack/react-query";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { PencilLine, Trash2 } from "lucide-react";
import { Popconfirm, Tag } from "antd";
import { toast } from "react-toastify";
import DeleteProductModal from "./src/DeleteProductModal";
import { deleteProductById, getAllProduct } from "@/apis/product.api";
import RestoreProductModal from "./src/RestoreProductModal";
import UpdateProductModal from "./src/UpdateProductModal";
import { Product, ProductFilter } from "@/types/Product/Product.type";
import { Link } from "@/components";
import { useTableFilter } from "@/hooks/useTableFilter";
import { useTableSearch } from "@/hooks/useTableSearch";

function ProductTrashBin() {
  const { filter, setFilter, handleTableChange } =
    useTableFilter<ProductFilter>({
      paging: {
        page: 1,
        size: 10,
        orders: {},
      },
      name: "",
      isDeleted: true,
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
      title: "Tên sản phẩm ",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Product) => (
        <Link to={`/admin/product/${record.id}`} className="text-primary">
          {text}
        </Link>
      ),
      ...getColumnSearchProps("name"),
      sorter: true,
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
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
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
      title: "Giá bán",
      dataIndex: "sellingPrice (₫)",
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
      render: (price: number) =>
        price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
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
            title="Xóa vĩnh viễn"
            onConfirm={async () => {
              await deleteProductById(row.id, true);
              refetch();
            }}
            description={
              <p>Sản phẩm này sẽ bị xóa vĩnh viễn. Bạn vẫn chắc chứ?</p>
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
        toHistoryBack
        quantity={paging?.totalRecord}
        loading={isLoading}
        onClickDelete={() => {
          if (selectedRowKeys.length > 0) setOpenModal("delete");
          else toast.info("Vui lòng chọn các mục để xóa.");
        }}
        onClickRefresh={() => refetch()}
        onClickRestore={() => {
          if (selectedRowKeys.length > 0) setOpenModal("restore");
          else toast.info("Vui lòng chọn các mục để khôi phục.");
        }}
        onClickExport={() => 2}
        countTrash="1"
        title={
          <>
            Danh sách sản phẩm <Tag color="red">Thùng rác</Tag>
          </>
        }
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

      <DeleteProductModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        isDelete={true}
        title="Các mục bên dưới sẽ bị xóa vĩnh viễn. Bạn chắc chứ?"
      />
      <RestoreProductModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        isDelete={true}
      />
      <UpdateProductModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        id={id}
      />
    </>
  );
}

export default ProductTrashBin;
