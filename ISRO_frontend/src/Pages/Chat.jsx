import ChatLeft from "../Components/Chatleft";
import Chatmiddle from "../Components/Chatmiddle";
import Chatright from "../Components/Chatright";

export default function Chat() {
  return (
    <div className="flex h-full w-full bg-white dark:bg-[#0d0d0f] transition-colors duration-300">
      <ChatLeft />
      <Chatmiddle />
      <Chatright />
    </div>
  );
}
