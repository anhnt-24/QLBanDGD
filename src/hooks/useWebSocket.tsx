import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { ChatMessage } from "@/types/ChatMessage.type";

const SOCKET_URL = "http://localhost:8080/ws";

const useWebSocket = (
  onMessage: (msg: string) => void,
  subscribe: string,
  sendTo: string,
) => {
  const [connected, setConnected] = useState(false);
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS(SOCKET_URL);
    const client = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("🔗 Kết nối WebSocket thành công!");
        setConnected(true);
        client.subscribe(subscribe, (message) => {
          onMessage(message.body);
        });
      },
      onStompError: (frame) => {
        console.error("❌ Lỗi STOMP:", frame);
      },
      onDisconnect: () => {
        console.log("🔌 WebSocket bị ngắt kết nối!");
        setConnected(false);
      },
    });

    client.activate();
    stompClient.current = client;

    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.deactivate();
      }
    };
  }, []);

  const sendMessage = (message: ChatMessage) => {
    if (stompClient.current && connected) {
      stompClient.current.publish({
        destination: sendTo,
        body: JSON.stringify(message),
      });
      console.log(message);
      console.log(JSON.stringify(message));
    }
  };

  return { sendMessage, connected };
};

export default useWebSocket;
