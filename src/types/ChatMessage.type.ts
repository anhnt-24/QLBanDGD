export interface ChatMessage {
  id?: string;
  senderId?: string;
  receiverId?: string;
  message: string;
}

export interface ChatMessageFilter {
  senderId?: string;
  receiverId?: string;
}
