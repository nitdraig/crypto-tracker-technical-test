import React, { useState } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";

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
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #00fff2;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h3`
  text-align: center;
  margin-bottom: 20px;
`;

const Modal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setShowModal(true);
        setUsername("");
        setPassword("");
      } else {
        console.error("Error de registro");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRedirectToLogin(true);
  };

  if (redirectToLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Registro</Title>
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
      {showModal && (
        <Modal>
          <ModalContent>
            <p>¡Usuario creado correctamente!</p>
            <Button onClick={handleModalClose}>Cerrar</Button>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Register;
