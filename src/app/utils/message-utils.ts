import {ChatMessage, MessageType} from '../model/chatmessage';



const sender = (msg, _sender) => {
  msg.sender = _sender;
  return msg;
};

const receiver = (msg, _receiver) => {
  msg.receiver = _receiver;
  return msg;
};

const type = (msg, _type) => {
  msg.type = _type;
  return msg;
};
export function createSendMessage(text, _sender, _receiver) {
  const msg = new ChatMessage();
  msg.content = text;
  return type(sender(receiver(msg, _receiver), _sender), MessageType.SEND);
}
