import { getAllChatMessage } from "@/apis/chatmessage.api";
import { Button, Divider } from "@/components";
import useWebSocket from "@/hooks/useWebSocket";
import { ChatMessage, ChatMessageFilter } from "@/types/ChatMessage.type";
import { PagingRequest } from "@/types/Pageable/Pageable.types";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Badge, Spin } from "antd";
import Search from "antd/es/input/Search";
import TextArea from "antd/es/input/TextArea";
import { Images, Mic, Paperclip, Send, Smile, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ListGuest from "./src/ListGuest";
import { Guest } from "@/types/Guest.type";

function ChatAdmin() {
  const [receiver, setReceiver] = useState<Guest>();
  const senderId = "admin";
  const [message, setMessage] = useState<ChatMessage>({
    senderId: senderId,
    receiverId: receiver?.id,
    message: "",
  });
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const { sendMessage } = useWebSocket(
    (msg) => handleReceiveMessage(msg),
    `/user/${senderId}/chat`,
    "/app/chat",
  );
  const [filter, setFilter] = useState<PagingRequest<ChatMessageFilter>>({
    paging: {
      page: 1,
      size: 20,
      orders: {
        createdDate: "DESC",
      },
    },
    senderId: senderId,
    receiverId: receiver?.id,
  });
  console.log(receiver);
  const { data, isLoading } = useQuery({
    queryKey: ["messages", filter],
    queryFn: () => getAllChatMessage(filter),
  });
  const contents = data?.data.data?.contents;
  const paging = data?.data.data?.paging;

  const chatbox = useRef<HTMLDivElement>(null);

  const handleReceiveMessage = (msg: string) => {
    setMessages((prev) => [...prev, JSON.parse(msg)]);
  };

  useEffect(() => {
    const handleChangeReceiver = () => {
      setMessages([]);
      setMessage((prev) => ({
        ...prev,
        message: "",
        senderId: senderId,
        receiverId: receiver?.id,
      }));
      setFilter((prev: any) => ({
        ...prev,
        paging: {
          ...prev.paging,
          page: 1,
        },
        receiverId: receiver?.id,
      }));
    };
    handleChangeReceiver();
  }, [receiver]);
  const handleSendMessage = (event: any) => {
    if (
      event.type === "click" ||
      (event.key === "Enter" && (!event.shiftKey || !message))
    ) {
      if (message.message.trim()) {
        sendMessage(message);
        setMessages((prev) => [...prev, message]);
        setMessage((prev) => ({
          ...prev,
          message: "",
        }));
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
    if (chatbox.current)
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
          paging: {
            ...prev.paging,
            page: paging?.pageNumber + 1,
          },
        }));
      }
    };

    if (chatbox.current) {
      chatbox.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatbox.current) {
        chatbox.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [messages]);

  return (
    <div>
      <h3 className="mb-4 bg-white p-4">Trò chuyện</h3>
      <div className="flex gap-4">
        <ListGuest setReceiver={(item: Guest) => setReceiver(item)}></ListGuest>
        <div className="flex-1 bg-white p-4">
          <div>
            <div className="flex items-center gap-2 border-b-1 border-gray-200 p-3 px-6 pt-0">
              <Badge dot color="green" offset={[-5, 35]}>
                <Avatar
                  size="large"
                  style={{ backgroundColor: `${receiver?.color}` }}
                  icon={<User />}
                />
              </Badge>
              <h3>{receiver?.name}</h3>
            </div>
            <div
              className="my-2 flex max-h-140 min-h-140 flex-col gap-4 overflow-auto px-6 py-2"
              ref={chatbox}
            >
              {isLoading && <Spin></Spin>}
              {messages.map((item) => {
                if (item.receiverId != receiver?.id) {
                  return (
                    <div className="flex gap-2">
                      <Badge dot color="green" offset={[-5, 35]}>
                        <Avatar
                          size="large"
                          style={{ backgroundColor: "#87d068" }}
                          icon={<User />}
                        />
                      </Badge>
                      <p className="max-w-[80%] rounded-lg bg-gray-200 p-2">
                        {item.message}
                      </p>
                    </div>
                  );
                } else
                  return (
                    <div className="flex justify-end gap-2">
                      <p className="bg-primary max-w-[80%] rounded-lg p-2 text-white">
                        {item.message}
                      </p>
                      <Badge dot color="green" offset={[-5, 35]}>
                        <Avatar
                          size="large"
                          style={{ backgroundColor: "#87d068" }}
                          icon={<User />}
                        />
                      </Badge>
                    </div>
                  );
              })}
              {messages.length === 0 && (
                <p className="text-center">Hiện chưa có tin nhắn nào.</p>
              )}
            </div>
            <Divider></Divider>
            <div className="mt-2 flex max-h-50 items-end gap-4 border-gray-200 bg-gray-100 p-4 text-gray-600">
              <button>
                <Paperclip />
              </button>
              <TextArea
                value={message.message}
                onChange={(e) => {
                  setMessage((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }));
                }}
                variant="borderless"
                placeholder="Ab"
                className="!mx-1 flex-1"
                autoSize={{ minRows: 1, maxRows: 4 }}
              ></TextArea>
              <button>
                <Mic />
              </button>
              <button>
                <Smile />
              </button>
              <button>
                <Images />
              </button>
              <Button
                onClick={handleSendMessage}
                variant="solid"
                color="primary"
                icon={<Send size={14}></Send>}
              >
                Gửi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatAdmin;
