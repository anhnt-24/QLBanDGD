import { Button, Card } from "@/components";
import React, { useCallback, useEffect, useState } from "react";
import { Table } from "antd";
import type { TableProps } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { EditFilled, DeleteFilled } from "@ant-design/icons";
import { getAllSanPham } from "@/apis/product.api";
import AddProduct from "./Components/AddProduct";

type ColumnsType<T extends object> = TableProps<T>["columns"];

interface DataType {
  id: string | number;
  ten: string;
  loai: string;
  gia: number | string;
  soluonganh: number | string;
  soluongbienthe: number | string;
  mota?: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "ten",
    key: "ten",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Phân loại",
    dataIndex: "loai",
    key: "loai",
  },
  {
    title: "Giá sản phẩm",
    dataIndex: "gia",
    key: "gia",
  },
  {
    title: "Mô tả",
    dataIndex: "mota",
    key: "mota",
  },
  {
    title: "Số lượng ảnh",
    dataIndex: "soluonganh",
    key: "soluonganh",
  },
  {
    title: "Số lượng biến thể",
    dataIndex: "soluongbienthe",
    key: "soluongbienthe",
  },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <div>
        <EditFilled className="mr-2 cursor-pointer !text-green-400"></EditFilled>
        <DeleteFilled className="cursor-pointer !text-red-400"></DeleteFilled>
      </div>
    ),
  },
];

function ProductPage() {
  const [listSanPham, setListSanPham] = useState<DataType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  useEffect(() => {
    getAllSanPham().then((data) => {
      setListSanPham(data.data);
    });
  }, [refresh]);
  const toggleRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, []);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <div className="mb-2">
        <div className="flex gap-2">
          <AddProduct refresh={toggleRefresh}></AddProduct>
          <Button
            icon={<DeleteFilled />}
            variant="solid"
            color="danger"
            onClick={toggleRefresh}
          >
            {" "}
            Xóa{" "}
          </Button>
        </div>
      </div>
      <div>
        <Table<DataType>
          columns={columns}
          pagination={{ position: ["bottomCenter"] }}
          dataSource={listSanPham}
          rowSelection={rowSelection}
        />
      </div>
    </>
  );
}

export default ProductPage;
