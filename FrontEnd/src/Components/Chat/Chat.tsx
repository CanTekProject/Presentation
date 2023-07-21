import { useEffect, useState, useRef } from "react";
import NavBar from "./ChatNavbar";
import ChatHeader from "./ChatHeader";
import ChatFooter from "./ChatFooter";
import ChatBody from "./ChatBody";
import IMessage from "./Message";
import { styled } from "styled-components";

const ChatContainer = styled.div`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .startSize {
    min-height: calc(
      30vh - 30px
    ); /* Adjust the 140px value based on your navbar and footer height */
    width: 100%;
    background-color: #ffffff;
    overflow-y: auto;
    scrollbar-width: thin;
  }

  .bg-gray-50 {
    background-color: #f9fafb;
  }

  .dark\:bg-gray-900 {
    background-color: #1f2937;
  }

  .flex {
    display: flex;
  }

  .flex-col {
    flex-direction: column;
  }

  .items-center {
    align-items: center;
  }

  .justify-center {
    justify-content: center;
  }

  .px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .py-8 {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .mx-auto {
    margin-left: auto;
    margin-right: auto;
  }

  .md\:h-screen {
    height: 100vh;
  }

  .lg\:py-0 {
    padding-top: 0;
    padding-bottom: 0;
  }

  .w-full {
    width: 100%;
  }

  .bg-white {
    background-color: #ffffff;
  }

  .rounded-lg {
    border-radius: 0.5rem;
  }

  .shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .dark\:border {
    border-color: #374151;
  }

  .md\:mt-0 {
    margin-top: 0;
  }

  .sm\:max-w-md {
    max-width: 28rem;
  }

  .xl\:p-0 {
    padding: 0;
  }

  .dark\:bg-gray-800 {
    background-color: #1f2937;
  }

  .dark\:border-gray-700 {
    border-color: #374151;
  }

  .p-6 {
    padding: 1.5rem;
  }

  .space-y-4 {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .md\:space-y-6 {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .text-xl {
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  .font-bold {
    font-weight: 700;
  }

  .leading-tight {
    line-height: 1.25;
  }

  .tracking-tight {
    letter-spacing: -0.025em;
  }

  .text-gray-900 {
    color: #1f2937;
  }

  .dark\:text-white {
    color: #ffffff;
  }
`;

type IChatProps = {
  socket: any;
};

export default function Chat({ socket }: IChatProps) {
  const [roomSelected, setRoomSelected] = useState<number>(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [text, setText] = useState<string>("");
  const lastMessageRef = useRef<null | HTMLDivElement>(null);

  function handleRoom(roomNumber: number) {
    setRoomSelected(roomNumber);
  }

  function addMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (text.trim() && localStorage.getItem("userName")) {
      socket.emit("message", {
        text: text,
        userName: localStorage.getItem("userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        roomNumber: roomSelected,
      });
    }
    setText("");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if the user is not authenticated
      window.location.href = "/Login";
    }
  }, []);

  useEffect(() => {
    socket.on("messageResponse", (data: any) =>
      setMessages([...messages, data])
    );
  }, [messages, socket]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <ChatContainer className="startSize flex flex-col justify-between flex-1 h-screen p:2 sm:p-6">
        <NavBar socket={socket} />
        <ChatHeader handleRoom={handleRoom} roomSelected={roomSelected} />
        <ChatBody
          messages={messages}
          roomSelected={roomSelected}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter
          addMessage={(e: React.FormEvent<HTMLFormElement>) => addMessage(e)}
          text={text}
          setText={setText}
        />
      </ChatContainer>
    </>
  );
}
