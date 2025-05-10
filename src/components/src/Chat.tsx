import { Avatar, Input } from "antd";
import {
  Camera,
  ImagePlus,
  Mic,
  Phone,
  Send,
  Smile,
  User2,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import useWebSocket from "@/hooks/useWebSocket";
import Divider from "./Divider";
import { ChatMessage, ChatMessageFilter } from "@/types/ChatMessage.type";
import { ChildrenPropsType } from "@/types";
import { getAllChatMessage } from "@/apis/chatmessage.api";
import { useQuery } from "@tanstack/react-query";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { getGuestById } from "@/apis/guest.api";

const iconItems = [
  { icon: <Mic />, onClick: () => console.log("Mic clicked") },
  { icon: <ImagePlus />, onClick: () => console.log("ImagePlus clicked") },
  { icon: <Smile />, onClick: () => console.log("Smile clicked") },
];

function Chat({ senderId }: ChildrenPropsType) {
  if (senderId) {
    const [message, setMessage] = useState<ChatMessage>({
      senderId,
      receiverId: "admin",
      message: "",
    });
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const chatbox = useRef<HTMLDivElement>(null);
    const guest = useQuery({
      queryKey: ["getGuestById", senderId],
      queryFn: () => getGuestById(senderId).then((data) => data.data.data),
    });

    const { sendMessage } = useWebSocket(
      (msg) => handleReceiveMessage(msg),
      `/user/${senderId}/chat`,
      "/app/chat",
    );

    const [filter, setFilter] = useState<PagingRequest<ChatMessageFilter>>({
      paging: { page: 1, size: 20, orders: {} },
      receiverId: "admin",
      senderId,
    });

    const { data, isLoading } = useQuery({
      queryKey: ["messages", filter],
      queryFn: () => getAllChatMessage(filter),
    });

    const contents = data?.data.data?.contents;
    const paging = data?.data.data?.paging;

    const handleReceiveMessage = (msg: string) => {
      setMessages((prev) => [...prev, JSON.parse(msg)]);
    };

    const handleSendMessage = (event: any) => {
      if (
        event.type === "click" ||
        (event.key === "Enter" && (!event.shiftKey || !message.message))
      ) {
        if (message.message.trim()) {
          sendMessage(message);
          setMessages((prev) => [...prev, message]);
          setMessage((prev) => ({ ...prev, message: "" }));
        }
        event.preventDefault();
      }
    };

    useEffect(() => {
      if (contents) setMessages((prev) => [...contents.reverse(), ...prev]);
      if (chatbox.current) {
        chatbox.current.scrollTop = 600;
      }
    }, [contents]);
    useEffect(() => {
      if (chatbox.current) {
        if (
          chatbox.current.scrollHeight -
            chatbox.current.scrollTop -
            chatbox.current.clientHeight <
            100 ||
          paging?.pageNumber === 1
        ) {
          chatbox.current.scrollTop = chatbox.current.scrollHeight;
        }
        const handleScroll = () => {
          const top = chatbox.current?.scrollTop === 0;
          if (
            top &&
            !isLoading &&
            paging?.pageNumber &&
            paging.pageNumber < paging.totalPage
          ) {
            setFilter((prev: any) => ({
              ...prev,
              paging: { ...prev.paging, page: paging.pageNumber + 1 },
            }));
          }
        };
        chatbox.current.addEventListener("scroll", handleScroll);
        return () => {
          chatbox.current?.removeEventListener("scroll", handleScroll);
        };
      }
    }, [messages]);

    return (
      <div className="flex h-[500px] w-[400px] -translate-x-56 translate-y-26 flex-col rounded-2xl border border-gray-200 bg-[#f9fafb] shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl border-b border-gray-200 bg-white p-3">
          <div className="flex items-center gap-2">
            <Avatar
              size="large"
              style={{ backgroundColor: `${guest.data?.color}` }}
            >
              <User2></User2>
            </Avatar>
            <span className="font-semibold text-gray-800">
              {guest.data?.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Phone className="cursor-pointer hover:text-blue-500" />
            <Camera className="cursor-pointer hover:text-blue-500" />
            {/* <X className="cursor-pointer hover:text-red-500" /> */}
          </div>
        </div>

        {/* Body */}
        <div
          className="flex-1 space-y-2 overflow-y-auto px-4 py-2"
          ref={chatbox}
        >
          {messages.map((item, index) => {
            const isMine = item.senderId === senderId;
            return (
              <div
                key={index}
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <span
                  className={`max-w-[75%] rounded-xl px-3 py-2 text-sm break-words whitespace-pre-wrap ${
                    isMine
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {item.message}
                </span>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="flex items-end gap-2 border-t border-gray-200 bg-white p-2">
          {iconItems.map((item, key) => (
            <button
              key={key}
              className="text-gray-500 transition hover:text-blue-500"
              onClick={item.onClick}
            >
              {item.icon}
            </button>
          ))}
          <Input.TextArea
            value={message.message}
            onChange={(e) =>
              setMessage((prev) => ({ ...prev, message: e.target.value }))
            }
            onKeyDown={handleSendMessage}
            placeholder="Nhập tin nhắn..."
            className="!rounded-xl !border-gray-300"
            autoSize={{ minRows: 1, maxRows: 4 }}
          />
          <button
            onClick={handleSendMessage}
            className="text-blue-500 transition hover:text-blue-600"
          >
            <Send />
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
