import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../services/Auth";
import { Navigate } from "react-router-dom";
import { ModalRegister } from "../../components/ModalRegister";

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
  font-size: 1.75em;
  text-align: center;
  margin-bottom: 20px;
`;

const SubTitle = styled.h4`
  font-size: 1em;
  text-align: center;
  margin-bottom: 20px;
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [redirectToLogin, setRedirectToLogin] = useState(false);
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await register(username, password);
      setShowModal(true);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error de registro:", error);
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
        <SubTitle>Y podrás iniciar sesión</SubTitle>
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
      {showModal && <ModalRegister handleModalClose={handleModalClose} />}
    </>
  );
};

export default Register;
