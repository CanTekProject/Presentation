import IMessage from "./Message";
import { styled } from "styled-components";

const ChatContainer = styled.div`
  height: 100px; /* Set the initial height here */
  width: 100%;
  background-color: #ffffff;
  overflow-y: auto;
  scrollbar-width: thin;
`;

const ChatMessage = styled.div`
  .chat-message {
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

  /* Add any additional styles specific to chat messages here */
`;

type ChatBodyProps = {
  messages: IMessage[];
  roomSelected: number;
  lastMessageRef: any;
};

export default function ChatBody({
  messages,
  roomSelected,
  lastMessageRef,
}: ChatBodyProps) {
  return (
    <ChatContainer>
      {messages &&
        messages
          .filter((n) => n.roomNumber === roomSelected)
          .map((message, i) => {
            const isCurrentUser =
              localStorage.getItem("userName") === message.userName;

            return (
              <ChatMessage
                key={i}
                className={`chat-message ${
                  isCurrentUser
                    ? "flex items-end"
                    : "flex items-end justify-end"
                }`}
              >
                <div
                  className={`flex flex-col space-y-2 text-xs max-w-xs mx-2 order-${
                    isCurrentUser ? "2" : "1"
                  }`}
                >
                  <div>
                    <span
                      className={`px-4 py-2 rounded-lg inline-block ${
                        isCurrentUser
                          ? "rounded-bl-none bg-gray-300 text-gray-600"
                          : "rounded-br-none bg-blue-600 text-white"
                      }`}
                    >
                      {message.text}
                    </span>
                  </div>
                </div>
                <span
                  className={`order-1 italic ${isCurrentUser ? "" : "ml-auto"}`}
                >
                  {isCurrentUser ? "You" : message.userName}
                </span>
              </ChatMessage>
            );
          })}
      <div ref={lastMessageRef} />
    </ChatContainer>
  );
}
