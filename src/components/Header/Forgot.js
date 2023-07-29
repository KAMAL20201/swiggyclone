import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../client";

function Forgot() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [resetting, setResetting] = useState(false);

  const navigate=useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
 async function logoutHandler(e) {
      e.preventDefault();
        setResetting(true);
      try{
        const {data, error}=await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:3000/signin/reset',
        })
          console.log(data);
          if (error) {
            setErrorMsg(error.message);
            setResetting(false);
            
          } else if (data.user?.identities?.length === 0) {
            setErrorMsg('User already registered');
            setResetting(false);
          } else {
            setSuccessMsg('Success! Please check your inbox.');
          }
      }catch(error){
        console.log(error);
      }
      finally {
        setResetting(false); 
      }
  }


  return (
    <Container>
      <Form onSubmit={logoutHandler}>
        {errorMsg && <p style={{ color: "red", textAlign: "center",margin:"auto"}}>{errorMsg}</p>}
        {successMsg && <p style={{ color: "green", textAlign: "center",margin:"auto"}}>{successMsg}</p>}
        <Input
          type="email"
          id="email"
          placeholder="Enter Your email id"
          value={email}
          onChange={handleEmailChange}
        />
        <Button disabled={resetting}>{resetting? "Resetting":"Reset Password"}</Button>
        <span onClick={() => navigate(-1)}> &larr; Back to Sign In</span>
      </Form>
    </Container>
  );
}

export default Forgot;

const Container = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 100px 0px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width:40%;
  span
  {
      cursor:pointer;
  }
`;



const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  margin-top:5px;
  border: 2px solid black;
  width:50%;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 20px 0px;
  width:45%;
  background-color: #fc8019;
  color: #fff;
  border: none;
  cursor: pointer;
`;