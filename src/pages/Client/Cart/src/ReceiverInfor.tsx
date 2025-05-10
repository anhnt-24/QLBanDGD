import { Button, Input, ModalForm } from "@/components";
import { Form, Modal } from "antd";
import { Option } from "antd/es/mentions";
import axios from "axios";
import { ArrowRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

function ReceiverInfor() {
  const [open, setOpen] = useState(false);
  const [provinces, setProvinces] = useState<any>([]);
  const [districts, setDistricts] = useState<any>([]);
  const [communes, setCommunes] = useState<any>([]);
  const [selectedProvince, setSelectedProvince] = useState({
    id: null,
    name: "",
  });
  const [selectedDistrict, setSelectedDistrict] = useState({
    id: null,
    name: "",
  });
  const [selectedCommune, setSelectedCommune] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => setProvinces(response.data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedProvince.id}.htm`)
        .then((response) => setDistricts(response.data));
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedDistrict.id}.htm`)
        .then((response) => setCommunes(response.data));
    }
  }, [selectedDistrict]);
  const [savedAddress, setSavedAddress] = useState<any>(null);

  const onCreate = (values: any) => {
    const address = `${values.addressDetail}, ${selectedCommune.name}, ${selectedDistrict.name}, ${selectedProvince.name}`;
    const receiverInfo = {
      address,
      phone: values.phone,
      name: values.fullName,
    };
    localStorage.setItem("address", JSON.stringify(receiverInfo));
    setOpen(false);
    setSavedAddress(receiverInfo);
  };

  useEffect(() => {
    const stored = localStorage.getItem("address");
    if (stored) {
      setSavedAddress(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <h4>Địa chỉ nhận hàng</h4>
      <div className="bg-primary-50 border-primary mt-2 flex items-center rounded-lg border-1 p-2">
        <button
          onClick={() => setOpen(true)}
          className="text-primary flex-1 text-sm"
        >
          {savedAddress ? (
            <>
              <div className="flex gap-1 text-gray-800">
                <h4>Người nhận:</h4>

                <p>
                  {savedAddress.name} - {savedAddress.phone}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-1 text-gray-600">
                <MapPin size={14} className="fill-amber-200 text-red-500" />
                <div>
                  <p>{savedAddress.address}</p>
                </div>
              </div>
            </>
          ) : (
            <p>Vui lòng nhập địa chỉ nhận hàng.</p>
          )}
        </button>

        <Modal
          open={open}
          title="Thông tin nhận hàng"
          okText="Xác nhận"
          cancelText="Hủy"
          okButtonProps={{ autoFocus: true, htmlType: "submit" }}
          onCancel={() => setOpen(false)}
          destroyOnClose
          modalRender={(dom) => (
            <Form
              layout="vertical"
              name="form_in_modal"
              initialValues={{ modifier: "public" }}
              clearOnDestroy
              onFinish={(values) => onCreate(values)}
            >
              {dom}
            </Form>
          )}
        >
          <div className="flex justify-between gap-2">
            <Input
              required
              label="Họ và tên"
              placeholder="Họ và tên"
              name="fullName"
            />
            <Input
              required
              label="Số điện thoại"
              number
              placeholder="Số điện thoại"
              name="phone"
            />
          </div>
          <Input
            required
            type="Select"
            label="Tỉnh/Thành phố"
            placeholder="Tỉnh/Thành phố"
            name="province"
            className="mt-2"
            onChange={(value: any, option: any) =>
              setSelectedProvince({
                id: value,
                name: option.children,
              })
            }
          >
            {provinces.data &&
              provinces.data.map((province: any) => {
                return (
                  <Option value={province.id}>{province.full_name}</Option>
                );
              })}
          </Input>

          <Input
            required
            type="Select"
            label="Quận/Huyện"
            placeholder="Quận/Huyện"
            name="district"
            className="mt-2"
            onChange={(value: any, option: any) =>
              setSelectedDistrict({
                id: value,
                name: option.children,
              })
            }
          >
            {districts.data &&
              districts.data.map((district: any) => {
                return (
                  <Option value={district.id}>{district.full_name}</Option>
                );
              })}
          </Input>

          <Input
            required
            type="Select"
            label="Phường/Xã"
            placeholder="Phường/Xã"
            name="commune"
            className="mt-2"
            onChange={(value: any, option: any) =>
              setSelectedCommune({
                id: value,
                name: option.children,
              })
            }
          >
            {communes.data &&
              communes.data.map((commune: any) => {
                return <Option value={commune.id}>{commune.full_name}</Option>;
              })}
          </Input>

          <Input
            required
            label="Số nhà, tên đường"
            placeholder="Số nhà, tên đường"
            name="addressDetail"
            className="mt-2"
          ></Input>
        </Modal>

        <ArrowRight className="text-primary" />
      </div>
    </div>
  );
}

export default ReceiverInfor;
