import React, { SetStateAction } from "react";
import LoginFooter from "./ChatLoginFooter";
import InputLogin from "./ChatInputLogin";

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

type SignInProps = {
  setShowSignInUp: React.Dispatch<SetStateAction<boolean>>;
  showSignInUp: boolean;
  handleLogin: (e: any) => void;
  setUserName: React.Dispatch<SetStateAction<string>>;
  userName: string;
  setPassword: React.Dispatch<SetStateAction<string>>;
  password: string;
};

const SignInForm = styled.form`
  .login-button {
    width: 100%;
    text-white;
    bg-blue-600;
    hover:bg-blue-700;
    focus:ring-4;
    focus:outline-none;
    focus:ring-primary-300;
    font-medium;
    rounded-lg;
    text-sm;
    px-5;
    py-2.5;
    text-center;
    dark:bg-primary-600;
    dark:hover:bg-primary-700;
    dark:focus:ring-primary-800;
  }
`;

export default function SignIn({
  setShowSignInUp,
  showSignInUp,
  handleLogin,
  userName,
  setUserName,
  password,
  setPassword,
}: SignInProps) {
  return (
    <SignInForm
      className="space-y-4 md:space-y-6"
      action="#"
      onSubmit={(e: any) => handleLogin(e)}
    >
      <ChatContainer>
        <InputLogin
          label="User"
          type="text"
          name="userName"
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
          placeholder="enter your username"
        />
      </ChatContainer>
      <ChatContainer>
        <InputLogin
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
          placeholder="enter your password"
        />
      </ChatContainer>
      <button type="submit" className="login-button">
        Sign in
      </button>
      <LoginFooter
        message="Don’t have an account yet?"
        label="Sign up"
        setShowSignInUp={setShowSignInUp}
        showSignInUp={showSignInUp}
      />
    </SignInForm>
  );
}
