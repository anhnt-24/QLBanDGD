import TableAdminProduct from "@/components/src/TableAdminProduct";
import { TableRowSelection } from "antd/es/table/interface";
import { useEffect, useState } from "react";
import AddCategory from "./src/AddCategoryModal";
import { deleteCategoryById, getAllCategory } from "@/apis/category.apis";
import { useQuery } from "@tanstack/react-query";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { Category } from "@/types/Category/Category.type";
import { Edit, PencilLine, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components";
import { Popconfirm, Tag } from "antd";
import DeleteProductModal from "./src/DeleteCategoryModal";
import { toast } from "react-toastify";
import UpdateCategoryModal from "./src/UpdateCategoryModal";
import RestoreCategoryModal from "./src/RestoreCategoryModal";
import CategoryDetail from "./src/CategoryDetail";
import { useTableFilter } from "@/hooks/useTableFilter";

function CategoryAdmin() {
  type CategoryFilter = {
    name?: string;
    isDeleted?: boolean;
  };

  const { filter, setFilter, handleTableChange } =
    useTableFilter<CategoryFilter>({
      paging: {
        page: 1,
        size: 10,
        orders: {},
      },
      name: "",
      isDeleted: true,
    });
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["listCategory", filter],
    queryFn: () => getAllCategory(filter),
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
  };
  const handleOpenDetail = (id: string) => {
    setOpenModal("detail");
    setId(id);
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
      width: "60px",
    },
    {
      title: "Tên danh mục",
      dataIndex: "name",
      key: "name",
      width: "400px",
      render: (text: string, record: Category) => (
        <button
          className="text-primary"
          onClick={() => handleOpenDetail(record.id || "")}
        >
          {text}
        </button>
      ),
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
              await deleteCategoryById(row.id, false);
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
            Danh mục sản phẩm <Tag color="red">Thùng rác</Tag>
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
      <RestoreCategoryModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        isDelete={true}
      />
      <UpdateCategoryModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        id={id}
      />
      <CategoryDetail
        id={id}
        openModal={openModal}
        setClose={handleCloseModal}
      />
    </>
  );
}

export default CategoryAdmin;
