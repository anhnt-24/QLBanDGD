import { message } from "antd";
import { ChatMessageFilter } from "./../types/ChatMessage.type";
import { ChatMessage } from "@/types/ChatMessage.type";
import { http } from "@/config";
import { Chat } from "@/components";
import { ApiResponse } from "@/types";
import { PagingRequest, PagingResponse } from "@/types/Pageable/Pageable.types";

export const getAllChatMessage = (
  chatMessageFilter: PagingRequest<ChatMessageFilter>,
) =>
  http.post<ApiResponse<PagingResponse<ChatMessage>>>(
    "/chat-message/get/all",
    chatMessageFilter,
  );
