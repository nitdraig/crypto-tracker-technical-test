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

const ButtonLogin = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #0044ff;
  color: #fff9f9;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
`;
const ButtonRegister = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  margin: 0 10px;
  background-color: #00fff2;
  color: #000000;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
`;
const Title = styled.h2`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const IndexView: React.FC = () => {
  return (
    <>
      <IndexContainer>
        <Title>Bienvenido a Crypto Tracker</Title>
        <Presentation>
          <p>Hola! Esta es una aplicación para guardar tus criptomonedas.</p>
          <p>Regístrate o inicia sesión para comenzar a usarla.</p>
        </Presentation>
        <ButtonContainer>
          <ButtonLogin to="/login">Iniciar sesión</ButtonLogin>
          <ButtonRegister to="/register">Registrarse</ButtonRegister>
        </ButtonContainer>
      </IndexContainer>
    </>
  );
};

export default IndexView;
