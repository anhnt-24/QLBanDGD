import { Button, Link } from "@/components";
import { ChildrenPropsType } from "@/types";
import { ConfigProvider, Modal, Popconfirm, Table } from "antd";
import {
  ArchiveRestore,
  ArrowLeft,
  Plus,
  RotateCw,
  Sheet,
  Trash2,
} from "lucide-react";
import viVN from "antd/es/locale/vi_VN";
import { useNavigate } from "react-router";
function TableAdminProduct({
  dataSource,
  columns,
  onClickAdd,
  onClickDelete,
  toTrashBin,
  onClickExport,
  onClickRefresh,
  onClickRestore,
  title,
  countTrash,
  rowSelection,
  toList,
  listTitle,
  pagination,
  quantity,
  toHistoryBack,
  ...props
}: ChildrenPropsType) {
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      <div className="flex justify-between border-b-1 border-gray-200 p-4 text-gray-800">
        <h3>{title}</h3>
        {toTrashBin && (
          <Link className="text-red-500" to={toTrashBin}>
            Thùng rác
          </Link>
        )}
        {toList && (
          <Link className="text-green-600" to={toList}>
            {listTitle}
          </Link>
        )}
        {toHistoryBack && (
          <Link
            className="cursor-pointer text-red-500"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="inline" size={14} />
            Quay lại
          </Link>
        )}
      </div>

      <div className="bg-white p-4">
        <div className="mb-4 flex justify-between">
          <div className="flex gap-2">
            {onClickAdd && (
              <Button
                onClick={onClickAdd}
                icon={<Plus size={14} />}
                type="primary"
              >
                Thêm
              </Button>
            )}

            {onClickRestore && (
              <Button
                icon={<ArchiveRestore size={14} />}
                onClick={onClickRestore}
                variant="solid"
                color="primary"
              >
                Khôi phục
              </Button>
            )}

            {onClickDelete && (
              <Button
                icon={<Trash2 size={14} />}
                variant="solid"
                color="danger"
                onClick={onClickDelete}
              >
                Xóa
              </Button>
            )}

            {onClickExport && (
              <Button
                icon={<Sheet size={14} />}
                onClick={onClickExport}
                variant="solid"
                color="green"
              >
                Xuất báo cáo
              </Button>
            )}

            {onClickRefresh && (
              <Button icon={<RotateCw size={14} />} onClick={onClickRefresh}>
                Tải lại
              </Button>
            )}
          </div>
          <div>
            <Button>
              Tổng số: <h4 className="text-primary">{quantity}</h4>
            </Button>
          </div>
        </div>
        <ConfigProvider locale={viVN}>
          <Table
            scroll={{ x: "calc(700px + 50%)" }}
            {...props}
            bordered
            size="small"
            dataSource={dataSource}
            columns={columns}
            style={{ border: "1px !important" }}
            rowSelection={rowSelection}
            pagination={pagination}
            rowKey="id"
          />
        </ConfigProvider>
      </div>
    </div>
  );
}

export default TableAdminProduct;
