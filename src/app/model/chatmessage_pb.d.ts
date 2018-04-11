// package: com.laptech.chat.app.server.model
// file: chatmessage.proto

import * as jspb from "google-protobuf";

export class ChatMessage extends jspb.Message {
  getContent(): string;
  setContent(value: string): void;

  getSender(): string;
  setSender(value: string): void;

  getReceiver(): string;
  setReceiver(value: string): void;

  getType(): ChatMessage.MessageType;
  setType(value: ChatMessage.MessageType): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChatMessage.AsObject;
  static toObject(includeInstance: boolean, msg: ChatMessage): ChatMessage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChatMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChatMessage;
  static deserializeBinaryFromReader(message: ChatMessage, reader: jspb.BinaryReader): ChatMessage;
}

export namespace ChatMessage {
  export type AsObject = {
    content: string,
    sender: string,
    receiver: string,
    type: ChatMessage.MessageType,
  }

  export enum MessageType {
    JOIN = 0,
    SEND = 1,
    LOGOUT = 2,
    GET_USERS = 3,
  }
}

