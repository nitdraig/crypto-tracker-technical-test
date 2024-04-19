import React, { useState } from "react";
import styled from "styled-components";
import CryptoItem from "./components/CryptoItems";
import EditForm from "./components/EditForm";

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  z-index: 1000;

  @media screen and (max-width: 768px) {
    padding: 30px;
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

const ListContainer = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const TitleEdit = styled.h2`
  text-align: center;
  font-size: 1.5rem;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;
const SubTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.2rem;
  color: blue;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
`;
interface Crypto {
  id: string;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
}

interface CryptoListProps {
  cryptos: Crypto[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedCrypto: Crypto) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({
  cryptos,
  onDelete,
  onUpdate,
}) => {
  const [editingCrypto, setEditingCrypto] = useState<Crypto | null>(null);

  const handleEditClick = (crypto: Crypto) => {
    setEditingCrypto(crypto);
  };

  const handleUpdate = (updatedCrypto: Crypto) => {
    if (editingCrypto) {
      onUpdate(editingCrypto.id, updatedCrypto);
      setEditingCrypto(null);
    }
  };

  const handleCancel = () => {
    setEditingCrypto(null);
  };

  return (
    <ListContainer>
      <Title>Cryptos:</Title>
      <ul>
        {cryptos.map((crypto) => (
          <CryptoItem
            key={crypto.id}
            crypto={crypto}
            onDelete={onDelete}
            onEdit={handleEditClick}
          />
        ))}
      </ul>
      {editingCrypto && (
        <ModalBackground>
          <ModalContainer>
            <TitleEdit>Editando: </TitleEdit>
            <SubTitle> {editingCrypto.name}</SubTitle>
            <EditForm
              crypto={editingCrypto}
              onUpdate={handleUpdate}
              onCancel={handleCancel}
            />
          </ModalContainer>
        </ModalBackground>
      )}
    </ListContainer>
  );
};

export default CryptoList;
