import React, { useState } from "react";
import { supabase } from "../../client";
import styled from "styled-components";
import Footer from "../Footer/Footer";
import Header from "./Header";

import { NavLink } from "react-router-dom";
import { css } from "styled-components";
import { keyframes } from "styled-components";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isUsernameFocused, setUsernameFocused] = useState(false);
  const [isEmailFocused, setEmailFocused] = useState(false);
  const [isPasswordFocused, setPasswordFocused] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSigningUp(true);
    // Perform validation
    if (username.length < 3) {
      setUsernameFocused(true);
      setIsSigningUp(false);
      setUsername("");
      setUsernameError("Username must be at least 3 characters long");
      return;
    }

    if (!email.includes("@") || !email.includes(".com")) {
      setEmailFocused(true);
      setIsSigningUp(false);
      setEmail("");
      setEmailError("Invalid email format");
      return;
    }

    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password) ||
      !/[!@#$%^&*]/.test(password)
    ) {
      setPasswordFocused(true);
      setIsSigningUp(false);
      setPassword("");
      setPasswordError(
        "Password must contain at least 8 characters, one uppercase, one lowercase, and one symbol"
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            full_name: username,
          },
        },
      });
     console.log(data);
     if (error) {
      setErrorMsg(error.message);
      setIsSigningUp(false);
    } else if (data.user?.identities?.length === 0) {
      setErrorMsg('User already registered');
      setIsSigningUp(false);
    } else {
      setSuccessMsg('Success! Please check your inbox.');
    }
    } catch (error) {
      alert(error);
      setIsSigningUp(false);
    }
    finally {
      setIsSigningUp(false); // Hide loading indicator after the sign-in process is complete
    }
  }

  return (
    <>
      <Header />

      <Container>
        <Title> Sign Up</Title>
        {errorMsg && <p style={{ color: "red", textAlign: "center",margin:"auto"}}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green", textAlign: "center",margin:"auto"}}>{successMsg}</p>}
        <Form onSubmit={handleSubmit}>
          
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter Your UserName"
              value={username}
              onChange={handleUsernameChange}
              onFocus={() => setUsernameFocused(true)}
              onBlur={() => setUsernameFocused(false)}
              isFocused={isUsernameFocused}
           
            />
            {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}
          

          <Label htmlFor="password">Email:</Label>
          <Input
            type="email"
            id="email"
            placeholder="Enter Your email id"
            value={email}
            onChange={handleEmailChange}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
            isFocused={isEmailFocused}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={handlePasswordChange}
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            isFocused={isPasswordFocused}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

          <Button type="submit" disabled={isSigningUp}>{isSigningUp ? "Signing Up..." : "Sign Up"}</Button>
        </Form>

        <NavLink to="/signin">
          <SwitchButton> Already have an account? Sign In </SwitchButton>
        </NavLink>
        {message && <Message>{message}</Message>}
      </Container>

      <Footer />
    </>
  );
};

export default SignUp;

const ErrorMessage = styled.span`
  position:relative;
  left:420px;
  bottom:40px;
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;



const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 20%, 40%,50%, 70%, 80% { transform: translateX(-3px); }
   30%, 60%, 90% { transform: translateX(3px); }
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: 2px solid black;
  border-color: ${(props) =>
    props.isFocused && !props.value
      ? "red"
      : props.isFocused && props.value
      ? "green"
      : "black"};
  animation: ${(props) =>
    props.isFocused && !props.value
      ? css`
          ${shake} 0.5s;
        `
      : "none"};

  &:focus {
    outline: none;
  }
`;

const Message = styled.p`
  margin-top: 10px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;
const Button = styled.button`
  padding: 10px;
  margin: 20px 0px;
  background-color: #fc8019;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const SwitchButton = styled.button`
  margin: 10px 0px 50px 25%;
  padding: 5px;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
`;
