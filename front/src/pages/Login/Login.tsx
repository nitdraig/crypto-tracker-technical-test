import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../services/Auth";
import { Navigate } from "react-router-dom";

const LoginForm = styled.form`
  max-width: 300px;
  margin: 0 auto;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const { setToken } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        setRedirectToDashboard(true);
      } else {
        console.error("Error de inicio de sesión");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (redirectToDashboard) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <LoginForm onSubmit={handleSubmit}>
      <Title>Iniciar sesión</Title>
      <FormGroup>
        <Label htmlFor="username">Usuario:</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="password">Contraseña:</Label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit">Iniciar sesión</Button>
    </LoginForm>
  );
};

export default Login;
