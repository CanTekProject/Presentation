import React, { useState } from "react";
import styled from "styled-components";
import SignIn from "./ChatSignIn";
import SignUp from "./ChatSignup";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.section`
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

export default function Login() {
  const navigation = useNavigate();
  const [showSignInUp, setShowSignInUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (email && userName && password) {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userName,
          email: email,
          password: password,
        }),
      });
      const user = await response.json();
      localStorage.setItem("userName", user.username);
      setShowSignInUp(false);
      navigation("/");
    }
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userName && password) {
      try {
        const response = await fetch("http://localhost:8000/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            password: password,
          }),
        });

        if (response.status === 200) {
          const user = await response.json();
          localStorage.setItem("token", user.token);
          localStorage.setItem("userName", userName);
          navigation("/chat");
        } else {
          navigation("/ChatLogin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <LoginContainer className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              {showSignInUp ? "Create an account" : "Sign in to your account"}
            </h1>
            {showSignInUp ? (
              <SignUp
                userName={userName}
                setUserName={setUserName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleRegister={handleRegister}
                setShowSignInUp={setShowSignInUp}
                showSignInUp={showSignInUp}
              />
            ) : (
              <SignIn
                userName={userName}
                setUserName={setUserName}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                setShowSignInUp={setShowSignInUp}
                showSignInUp={showSignInUp}
              />
            )}
          </div>
        </div>
      </div>
    </LoginContainer>
  );
}
