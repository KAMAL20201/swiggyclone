import React, { useState } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import styled from "styled-components";
import { loginWithGoogle, supabase } from "../../client";
import { setUserName, setUserToAuthenticated,setAuthToken } from "../../store/userAuthSlice";
import { useDispatch } from "react-redux";

import { FcGoogle } from "react-icons/fc";


function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      });
      if(error) throw error
      dispatch(setUserToAuthenticated(true));
      dispatch(setUserName(data.user.user_metadata.full_name));
      dispatch(setAuthToken(data))
      console.log(data);
      navigate('/');
      
    } catch (error) {
      setError(error);
    }finally {
      setIsSigningIn(false); // Hide loading indicator after the sign-in process is complete
    }
  }

  return (
    <>
      <Container>
        <Title> Sign In</Title>
      
          <Form onSubmit={handleSubmit}>
          {error && <p style={{ color: "red", textAlign: "center",margin:"auto"}}>Invalid Credentials</p>}
            <Label htmlFor="password">Email:</Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter Your email id"
              value={email}
              onChange={handleEmailChange}
            />

            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={handlePasswordChange}
            />

            <Button type="submit" disabled={isSigningIn}> 
            {isSigningIn ? "Signing You In..." : "Sign In"}
            </Button>
          </Form>
        <Forgot><NavLink to="forgot"> Forgot Your Password?</NavLink></Forgot>
        <StyledNavLink to="/signup">
         <SwitchButton> New User ? Sign Up </SwitchButton>
        </StyledNavLink>
         <p>OR</p>
        <span>Sign in with</span>
        <button onClick={loginWithGoogle}><FcGoogle/></button>
      </Container>

    </>
  );
}

export default SignIn;

const Forgot=styled.div`
display:flex;
align-items:center;
justify-content:flex-end;
a{
  font-size:12px;
  color:#fc8019;
}
`

const Container = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
`;

const StyledNavLink = styled(NavLink)`
display:flex;
align-items:center;
justify-content:center;
`


const SwitchButton = styled.button`
  padding: 5px;
  background-color: transparent;
  border: none;
  color: black;
  cursor: pointer;
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
  border: 1px solid #fc8019;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 20px 0px;
  background-color: #fc8019;
  color: #fff;
  border: none;
  cursor: pointer;
`;
