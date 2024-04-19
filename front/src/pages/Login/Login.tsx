import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../services/Auth";
import { Navigate } from "react-router-dom";
import Modal from "../../components/ModalLogin";

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
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #0044ff;
  color: #fff9f9;
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
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      setShowErrorModal(true);
      console.error("Error de inicio de sesión:", error);
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Iniciar sesión</Title>
        <SubTitle>Y podrás acceder al dashboard</SubTitle>
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

      {showErrorModal && (
        <Modal onClose={() => setShowErrorModal(false)}>
          Error: Nombre de usuario o contraseña incorrectos
        </Modal>
      )}
    </>
  );
};

export default Login;
