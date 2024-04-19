import React from "react";
import styled from "styled-components";

interface ModalProps {
  handleModalClose: () => void;
}

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
export const ModalRegister = ({ handleModalClose }) => {
  return (
    <>
      <Modal>
        <ModalContent>
          <p>¡Usuario creado correctamente!</p>
          <Button onClick={handleModalClose}>Cerrar</Button>
        </ModalContent>
      </Modal>
    </>
  );
};
