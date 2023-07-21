import { styled } from "styled-components";
const ChatContainer = styled.div`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

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

type ChatHeaderProps = {
  // setRoomSelected: React.Dispatch<SetStateAction<number>>;
  roomSelected: number;
  handleRoom: (roomNumber: number) => void;
};

export default function ChatHeader({
  handleRoom,
  roomSelected,
}: ChatHeaderProps) {
  return (
    <ChatContainer className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div className="relative flex items-center space-x-4">
        <div className="flex flex-col leading-tight">
          <div className="text-2xl mt-1 flex items-center">
            <span className="text-gray-700 mr-3">
              {localStorage.getItem("userName")}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleRoom(0)}
          type="button"
          className={`inline-flex items-center justify-center ${
            roomSelected === 0 ? "bg-gray-400" : ""
          } rounded-lg border h-10 w-16 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none`}
        >
          General
        </button>
        <button
          onClick={() => handleRoom(1)}
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border ${
            roomSelected === 1 ? "bg-gray-400" : ""
          }   h-10 w-16 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none`}
        >
          Room 1
        </button>
        <button
          onClick={() => handleRoom(2)}
          type="button"
          className={`inline-flex items-center justify-center rounded-lg border h-10 w-16 ${
            roomSelected === 2 ? "bg-gray-400" : ""
          } transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none`}
        >
          Room 2
        </button>
      </div>
    </ChatContainer>
  );
}
