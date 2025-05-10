import { Button } from "@/components";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Checkbox, Input, Space } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { Filter } from "lucide-react";
import { Key } from "react";

export function useTableSearch(setFilter: (value: any) => void) {
  const getColumnSearchProps = (dataIndex: string) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (selectedKeys: Key[]) => void;
      selectedKeys: Key[];
      confirm: (param?: FilterConfirmProps) => void;
      clearFilters?: () => void;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Tìm kiếm `}
          value={selectedKeys[0]}
          onChange={(e) => {
            setSelectedKeys(e.target.value ? [e.target.value] : [""]);
          }}
          onPressEnter={() => {
            confirm();
          }}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            onClick={() => {
              confirm();
            }}
            color="primary"
            variant="solid"
          >
            Tìm
          </Button>
          <Button
            onClick={() => {
              clearFilters && clearFilters();
              setSelectedKeys([""]);
            }}
          >
            Làm mới
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined className="text-gray-500" />
    ),
    onFilter: false,
    onFilterDropdownOpenChange: (visible: boolean) => {},
  });

  const getColumnFilterProps = (
    listCheck: { key: string; label: string }[],
  ) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: (selectedKeys: Key[]) => void;
      selectedKeys: Key[];
      confirm: (param?: FilterConfirmProps) => void;
      clearFilters?: () => void;
    }) => {
      const handleCheckBox = (checked: boolean, value: string) => {
        const newSelected = checked
          ? [...selectedKeys, value]
          : selectedKeys.filter((key) => key !== value);
        setSelectedKeys(newSelected);
      };

      return (
        <div style={{ padding: 8, width: 220 }}>
          <div style={{ maxHeight: 150, overflowY: "auto", marginBottom: 8 }}>
            {listCheck.map(({ key, label }) => (
              <Checkbox
                name="cc"
                key={key}
                value={key}
                checked={selectedKeys.includes(key)}
                onChange={(e) => handleCheckBox(e.target.checked, key)}
                style={{ display: "block" }}
              >
                {label}
              </Checkbox>
            ))}
          </div>
          <Space>
            <Button onClick={() => confirm()} color="primary" variant="solid">
              Lọc
            </Button>
            <Button
              onClick={() => {
                clearFilters?.();
                setSelectedKeys([]);
              }}
            >
              Làm mới
            </Button>
          </Space>
        </div>
      );
    },
    filterIcon: (filtered: boolean) => (
      <FilterOutlined className="text-gray-500" />
    ),
    onFilter: false,
    onFilterDropdownOpenChange: (visible: boolean) => {},
  });

  return {
    getColumnSearchProps,
    getColumnFilterProps,
  };
}
