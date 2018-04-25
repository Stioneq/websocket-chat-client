export class ChatMessage {
  content: string;
  sender: string;
  receiver: string;
  messageType: MessageType;
}

export enum MessageType {
  JOIN, LOGOUT, SEND, GET_USERS
}
