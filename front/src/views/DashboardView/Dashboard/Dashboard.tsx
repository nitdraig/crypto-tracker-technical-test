import React from "react";
import styled from "styled-components";
import CryptoForm from "../CryptoForm/CryptoForm";
import CryptoList from "../CryptoList/CryptoList";
import { useAuth } from "../../../services/Auth";
import {
  useAddCrypto,
  useDeleteCrypto,
  useFetchCryptos,
  useUpdateCrypto,
} from "../../../services/CryptoService";

const DashboardContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 0 20px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Dashboard: React.FC = () => {
  const { token } = useAuth();

  const { data: cryptos } = useFetchCryptos(token);
  const addCryptoMutation = useAddCrypto(token);
  const deleteCryptoMutation = useDeleteCrypto(token);
  const updateCryptoMutation = useUpdateCrypto(token);

  const handleAddCrypto = async (newCrypto: {
    name: string;
    ticker: string;
    purchasePrice: number;
    quantity: number;
  }) => {
    try {
      await addCryptoMutation.mutateAsync(newCrypto);
    } catch (error) {
      console.error("Error al agregar criptomoneda:", error);
    }
  };

  const handleDeleteCrypto = async (cryptoId: string) => {
    try {
      await deleteCryptoMutation.mutateAsync(cryptoId);
    } catch (error) {
      console.error("Error al borrar criptomoneda:", error);
    }
  };

  const handleUpdateCrypto = async (
    cryptoId: string,
    updatedCrypto: {
      id: string;
      name: string;
      ticker: string;
      purchasePrice: number;
      quantity: number;
    }
  ) => {
    try {
      await updateCryptoMutation.mutateAsync({ cryptoId, updatedCrypto });
    } catch (error) {
      console.error("Error al actualizar criptomoneda:", error);
    }
  };

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <CryptoForm onSubmit={handleAddCrypto} />
      {cryptos && (
        <CryptoList
          cryptos={cryptos}
          onDelete={handleDeleteCrypto}
          onUpdate={handleUpdateCrypto}
        />
      )}
    </DashboardContainer>
  );
};

export default Dashboard;
