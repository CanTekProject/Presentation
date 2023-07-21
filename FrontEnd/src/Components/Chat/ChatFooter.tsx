import React, { SetStateAction } from "react";
import { styled } from "styled-components";

const ChatContainer = styled.form`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  .startSize {
    min-height: 100px; /* Set the initial height here */
    width: 98.75%;
    background-color: #ffffff;
    overflow-y: auto;
    scrollbar-width: thin;
    padding: 8px; /* Adjust padding as needed */
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98%;
  padding: 4px; /* Adjust padding as needed */
  background-color: #f3f4f6;
  border-radius: 8px;
`;

const InputField = styled.input`
  width: calc(
    90% - 50px
  ); /* Set the input field width to 90% of the available space minus the button width */
  height: 32px; /* Adjust the height as needed */
  padding: 4px; /* Adjust padding as needed */
  font-size: 14px;
  color: #1f2937;
  background-color: transparent;
  border: none;
  outline: none;
  transition: background-color 0.2s ease-in-out;
  margin-right: 10px; /* Add some margin to separate the input field from the button */

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    background-color: #ffffff;
  }
`;

const SendButton = styled.button`
  margin-left: 8px; /* Add some space between the input and button */
  padding: 4px 8px;
  font-size: 14px;
  font-weight: bold;
  color: #ffffff;
  background-color: #3b82f6;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #2563eb;
  }
`;

type ChatFooterProps = {
  addMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  text: string;
  setText: React.Dispatch<SetStateAction<string>>;
};

export default function ChatFooter({
  addMessage,
  text,
  setText,
}: ChatFooterProps) {
  return (
    <ChatContainer onSubmit={addMessage}>
      <div className="px-4 pt-4 mb-2 border-t-2 border-gray-200 sm:mb-0">
        <div className="startSize">
          <InputWrapper>
            <InputField
              type="text"
              value={text}
              onChange={(e: any) => setText(e.target.value)}
              placeholder="Write your message!"
            />
            <SendButton type="submit">
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </SendButton>
          </InputWrapper>
        </div>
      </div>
    </ChatContainer>
  );
}
