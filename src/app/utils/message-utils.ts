import {ChatMessage} from '../model/chatmessage_pb';
import MessageType = ChatMessage.MessageType;



const sender = (msg, _sender) => {
  msg.setSender(_sender);
  return msg;
};

const receiver = (msg, _receiver) => {
  msg.setReceiver(_receiver);
  return msg;
};

const type = (msg, _type) => {
  msg.setType(_type);
  return msg;
};
export function createSendMessage(text, _sender, _receiver) {
  const msg = new ChatMessage();
  msg.setContent(text);
  return type(sender(receiver(msg, _receiver), _sender), MessageType.SEND);
}
