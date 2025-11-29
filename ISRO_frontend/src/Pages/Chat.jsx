import ChatLeft from "../Components/Chatleft";
import Chatmiddle from "../Components/Chatmiddle";
import Chatright from "../Components/Chatright";

function Chat() {
    console.log("in the chat")
  return (
    <div flex className="flex h-screen w-screen">
      <ChatLeft />
      <Chatmiddle />
      <Chatright />
    </div>
  );
}

export default Chat;
