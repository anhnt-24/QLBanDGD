import TableAdminProduct from "@/components/src/TableAdminProduct";
import {
  FilterValue,
  SorterResult,
  TablePaginationConfig,
  TableRowSelection,
} from "antd/es/table/interface";
import { useEffect, useState } from "react";
import AddCategory from "./src/AddCategoryModal";
import { deleteCategoryById, getAllCategory } from "@/apis/category.apis";
import { useQuery } from "@tanstack/react-query";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { Category, CategoryFilter } from "@/types/Category/Category.type";
import { Edit, PencilLine, Trash, Trash2 } from "lucide-react";
import { Popconfirm } from "antd";
import DeleteCategoryModal from "./src/DeleteCategoryModal";
import { toast } from "react-toastify";
import UpdateCategoryModal from "./src/UpdateCategoryModal";
import CategoryDetail from "./src/CategoryDetail";
import { useTableFilter } from "@/hooks/useTableFilter";
import { useTableSearch } from "@/hooks/useTableSearch";

function CategoryAdmin() {
  const { filter, setFilter, handleTableChange } =
    useTableFilter<CategoryFilter>({
      paging: {
        page: 1,
        size: 10,
        orders: {},
      },
      name: "",
      isDeleted: false,
    });
  const { getColumnSearchProps } = useTableSearch(setFilter);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["listCategory", filter],
    queryFn: () => getAllCategory(filter),
  });

  const dataSource = data?.data?.data;
  const paging = dataSource?.paging;
  const [openModal, setOpenModal] = useState<string>("");
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
        loading={isLoading}
        quantity={paging?.totalRecord}
        onClickAdd={() => setOpenModal("add")}
        onClickDelete={() => {
          if (selectedRowKeys.length > 0) setOpenModal("delete");
          else toast.info("Vui lòng chọn các mục để xóa.");
        }}
        onClickRefresh={() => refetch()}
        onClickExport={() => 2}
        toTrashBin="/admin/trash/category"
        countTrash="1"
        title="Danh mục sản phẩm"
        dataSource={dataSource?.contents}
        columns={columns}
        rowSelection={rowSelection}
        pagination={{
          current: paging?.pageNumber,
          pageSize: paging?.pageSize,
          total: paging?.totalRecord,
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
      <AddCategory
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
      />
      <DeleteCategoryModal
        refetch={refetch}
        openModal={openModal}
        setClose={handleCloseModal}
        listId={selectedRowKeys}
        isDelete={false}
        title="Các mục bên dưới sẽ bị chuyển vào thùng rác."
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
