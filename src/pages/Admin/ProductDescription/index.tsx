import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { ChildrenPropsType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router";
import {
  getProductDescriptionById,
  updateProductDescription,
} from "@/apis/productDesc.api";
import { ProductDescription } from "@/types/ProductDescription.type";
import { toast } from "react-toastify";
import { getProductById } from "@/apis/product.api";
import { ArrowLeft } from "lucide-react";
import { Spin } from "antd";

// Khởi tạo markdown-it parser
const mdParser = new MarkdownIt();

export default function ProductDescriptionEditor() {
  const { id } = useParams();
  if (id) {
    const [content, setContent] = useState("");
    const { data, isLoading } = useQuery({
      queryKey: ["getDescription", id],
      queryFn: () => getProductDescriptionById(id),
    });

    const product = useQuery({
      queryKey: ["getProductById", id],
      queryFn: () => getProductById(id || "").then((data) => data.data.data),
    });

    const updateMutation = useMutation({
      mutationFn: (request: ProductDescription) =>
        updateProductDescription(request),
      onSuccess: () => {
        toast.success("Thành công.");
      },
      onError: () => {
        toast.error("Thất bại.");
      },
    });
    const handleEditorChange = ({ html, text }: ChildrenPropsType) => {
      setContent(text);
    };

    useEffect(() => {
      if (data?.data?.data?.description) {
        setContent(data.data.data.description);
      }
    }, [data]);
    const navigate = useNavigate();

    return (
      <div className="bg-white">
        <div className="flex justify-between border-b-1 border-gray-200 p-4 text-gray-800">
          <h3>Mô tả sản phẩm</h3>
          <button
            className="cursor-pointer text-red-500"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="m-1 inline" size={14} />
            Quay lại
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <img
            src={`${product.data?.thumbnail}`}
            alt=""
            className="h-40 object-contain"
          />
          <p>{product.data?.name}</p>
        </div>
        <MdEditor
          value={content}
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />

        <button
          className="float-right mt-4 rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          onClick={() =>
            updateMutation.mutate({
              id: data?.data.data?.id,
              productId: id,
              description: content,
            })
          }
        >
          Lưu mô tả
        </button>
      </div>
    );
  }
  return <Spin></Spin>;
}
