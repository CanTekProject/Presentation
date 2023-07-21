import { InputHTMLAttributes } from "react";

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

interface InputLoginProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function InputLogin({ label, ...rest }: InputLoginProps) {
  return (
    <ChatContainer>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...rest}
      />
    </ChatContainer>
  );
}
