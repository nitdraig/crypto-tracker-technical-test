import { useState, useEffect } from "react";
import styled from "styled-components";
import CryptoForm from "../CryptoForm/CryptoForm";
import CryptoList from "../CryptoList/CryptoList";
import { useAuth } from "../../../services/Auth";

interface Crypto {
  id: string;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
}

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
  const [cryptos, setCryptos] = useState<Crypto[]>([]);

  useEffect(() => {
    fetchCryptos();
  }, []);

  const fetchCryptos = async () => {
    try {
      const response = await fetch("http://localhost:5000/crypto/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data: Crypto[] = await response.json();
      setCryptos(data);
    } catch (error) {
      console.error("Error al obtener criptomonedas:", error);
    }
  };

  const handleAddCrypto = async (newCrypto: {
    name: string;
    ticker: string;
    purchasePrice: number;
    quantity: number;
  }) => {
    try {
      const response = await fetch("http://localhost:5000/crypto/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newCrypto),
      });
      await response.json();
      fetchCryptos();
    } catch (error) {
      console.error("Error al agregar criptomoneda:", error);
    }
  };

  const handleDeleteCrypto = async (cryptoId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/crypto/mycrypto/${cryptoId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        }
      );
      await response.json();

      setCryptos(cryptos.filter((crypto) => crypto.id !== cryptoId));
    } catch (error) {
      console.error("Error al borrar criptomoneda:", error);
    }
  };

  const handleUpdateCrypto = async (
    cryptoId: string,
    updatedCrypto: Crypto
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/crypto/mycrypto/${cryptoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(updatedCrypto),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update crypto");
      }

      await response.json();
      fetchCryptos();
    } catch (error) {
      console.error("Error al actualizar criptomoneda:", error);
    }
  };

  return (
    <DashboardContainer>
      <Title>Dashboard</Title>
      <CryptoForm onSubmit={handleAddCrypto} />
      <CryptoList
        cryptos={cryptos}
        onDelete={handleDeleteCrypto}
        onUpdate={handleUpdateCrypto}
      />
    </DashboardContainer>
  );
};

export default Dashboard;
