import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const IndexContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Presentation = styled.div`
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #007bff;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
`;

const IndexView: React.FC = () => {
  return (
    <IndexContainer>
      <h2>Bienvenido a Crypto Tracker</h2>
      <Presentation>
        <p>¡Hola! Esta es una aplicación para rastrear tus criptomonedas.</p>
        <p>Regístrate o inicia sesión para comenzar.</p>
      </Presentation>
      <ButtonContainer>
        <Button to="/login">Iniciar sesión</Button>
        <Button to="/register">Registrarse</Button>
      </ButtonContainer>
    </IndexContainer>
  );
};

export default IndexView;
