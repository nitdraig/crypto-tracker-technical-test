import React from "react";
import styled from "styled-components";

const CryptoListItem = styled.li`
  margin-bottom: 10px;
`;

const CryptoInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CryptoButton1 = styled.button`
  width: 7em;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #ff0000;
  color: #fff;
  border: none;
  cursor: pointer;
`;
const CryptoButton2 = styled.button`
  width: 7em;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #33ff00;
  color: #000000;
  border: none;
  cursor: pointer;
`;
interface Crypto {
  id: string;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
}

interface CryptoItemProps {
  crypto: Crypto;
  onDelete: (id: string) => void;
  onEdit: (crypto: Crypto) => void;
}

const CryptoItem: React.FC<CryptoItemProps> = ({
  crypto,
  onDelete,
  onEdit,
}) => (
  <CryptoListItem>
    <CryptoInfo>
      <div>
        Nombre: {crypto.name} | Ticker: ({crypto.ticker}) | Precio:
        {crypto.purchasePrice} | Cantidad: {crypto.quantity} |
      </div>
      <div>
        <CryptoButton2 onClick={() => onEdit(crypto)}>Actualizar</CryptoButton2>
        <CryptoButton1 onClick={() => onDelete(crypto.id)}>
          Borrar
        </CryptoButton1>
      </div>
    </CryptoInfo>
  </CryptoListItem>
);

export default CryptoItem;
