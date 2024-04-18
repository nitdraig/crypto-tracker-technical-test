import { useState, useEffect } from "react";
import styled from "styled-components";
import CryptoForm from "../CryptoForm/CryptoForm";
import CryptoList from "../CryptoList/CryptoList";
import { useAuth } from "../../../services/Auth";

const DashboardContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [cryptos, setCryptos] = useState([]);
  console.log(token);
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
      const data = await response.json();
      setCryptos(data);
    } catch (error) {
      console.error("Error al obtener criptomonedas:", error);
    }
  };

  const handleAddCrypto = async (newCrypto) => {
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
  const handleDeleteCrypto = async (cryptoId) => {
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

      setCryptos(cryptos.filter((crypto) => crypto._id !== cryptoId));
    } catch (error) {
      console.error("Error al borrar criptomoneda:", error);
    }
  };
  const handleUpdateCrypto = async (updatedCrypto) => {
    try {
      const response = await fetch(
        `http://localhost:5000/crypto/mycrypto/${updatedCrypto._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(updatedCrypto),
        }
      );
      await response.json();
      // Actualizar la lista de criptomonedas
      const updatedCryptos = cryptos.map((crypto) => {
        if (crypto._id === updatedCrypto._id) {
          return updatedCrypto;
        } else {
          return crypto;
        }
      });
      setCryptos(updatedCryptos);
    } catch (error) {
      console.error("Error al actualizar criptomoneda:", error);
    }
  };

  return (
    <DashboardContainer>
      <h2>Dashboard</h2>
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
