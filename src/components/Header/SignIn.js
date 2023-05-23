import React, { useState } from 'react';

import styled from 'styled-components';
import Header from './Header';

const SignIn = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Sign up - store username and password in localStorage
      localStorage.setItem(username, password);
      setMessage('Sign up successful');
      
    } else {
      // Sign in - check if entered username and password match any stored credentials
      const storedPassword = localStorage.getItem(username);

      if (storedPassword === password) {
        // Username and password match, redirect to home page
        setMessage('Sign in successful');
        // Perform the desired action to navigate to the home page
        
      } else {
        // Username and password do not match
        setMessage('Invalid credentials');
      }
    }
  };

  const handleToggleSignUp = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
    <Header/>
    <Container>
      <Title>{isSignUp ? 'Sign Up' : 'Sign In'}</Title>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="username">Username:</Label>
        <Input type="text" id="username" value={username} onChange={handleUsernameChange} />

        <Label htmlFor="password">Password:</Label>
        <Input type="password" id="password" value={password} onChange={handlePasswordChange} />

        <Button type="submit">{isSignUp ? 'Sign Up' : 'Sign In'}</Button>
      </Form>

      <SwitchButton onClick={handleToggleSignUp}>
        {isSignUp ? 'Sign In' : 'New User? Sign Up Here'}
      </SwitchButton>
      {message && <Message>{message}</Message>}
    </Container>
    </>
  );
};

export default SignIn;

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

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
`;
const Message = styled.p`
  margin-top: 10px;
  text-align: center;
  color: #333;
`;
const Button = styled.button`
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const SwitchButton = styled.button`
  margin-top: 10px;
  padding: 5px;
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
`;
