import React from "react";
import styled from "styled-components";

interface Crypto {
  id: number;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
}

interface CryptoListProps {
  cryptos: Crypto[];
  onDelete: (index: number) => void;
  onUpdate: (index: number) => void;
}

const CryptoListItem = styled.li`
  margin-bottom: 10px;
`;

const CryptoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CryptoButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const CryptoList: React.FC<CryptoListProps> = ({
  cryptos,
  onDelete,
  onUpdate,
}) => (
  <div>
    <h3>Cryptos:</h3>
    <ul>
      {cryptos.map((crypto) => (
        <CryptoListItem key={crypto.id}>
          <CryptoInfo>
            <div>
              Nombre:{crypto.name} | Tiker:({crypto.ticker}) | Precio -
              {crypto.purchasePrice} | Cantidad - {crypto.quantity} |
            </div>
            <div>
              <CryptoButton onClick={() => onDelete(crypto.id)}>
                Delete
              </CryptoButton>
              <CryptoButton onClick={() => onUpdate(crypto.id)}>
                Update
              </CryptoButton>
            </div>
          </CryptoInfo>
        </CryptoListItem>
      ))}
    </ul>
  </div>
);

export default CryptoList;
