import React, { useState } from "react";
import styled from "styled-components";

const RegisterForm = styled.form`
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

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí puedes manejar el almacenamiento de los datos, como enviarlos a un servidor o almacenarlos localmente.
    console.log("Username:", username);
    console.log("Password:", password);
    // También puedes redirigir al usuario a otra página después de registrarlos.
  };

  return (
    <RegisterForm onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="username">Nombre de usuario:</Label>
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
      <Button type="submit">Registrar</Button>
    </RegisterForm>
  );
};

export default Register;
