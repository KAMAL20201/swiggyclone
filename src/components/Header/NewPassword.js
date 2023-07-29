import React, { useState } from "react";
import styled from "styled-components";
import { supabase } from "../../client";
function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetting, setResetting] = useState(false);
  async function handleReset(e) {
    e.preventDefault();
    setResetting(true);
    if (password !== confirmPassword) return;
    try {
      const data = await supabase.auth.updateUser({ password: password });
      console.log(data);
    } catch (error) {
      console.error("Error updating user password:", error);
    }
    setResetting(false);
  }
  return (
    <Container>
      <Form>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button onClick={handleReset}>{resetting?"Resetting": "Reset Password"}</Button>
      </Form>
    </Container>
  );
}

export default NewPassword;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  span {
    cursor: pointer;
  }
`;

const Container = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 100px 0px;
`;

const Input = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  margin-top: 5px;
  border: 2px solid black;
  width: 50%;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  padding: 10px;
  margin: 20px 0px;
  width: 45%;
  background-color: #fc8019;
  color: #fff;
  border: none;
  cursor: pointer;
`;
