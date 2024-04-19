import React from "react";
import styled from "styled-components";

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 16px;
`;

const Button = styled.button`
  width: 820px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 16px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

interface CryptoFormProps {
  onSubmit: (crypto: {
    name: string;
    ticker: string;
    purchasePrice: number;
    quantity: number;
  }) => void;
}

const CryptoForm: React.FC<CryptoFormProps> = ({ onSubmit }) => {
  const [name, setName] = React.useState("");
  const [ticker, setTicker] = React.useState("");
  const [purchasePrice, setPurchasePrice] = React.useState("");
  const [quantity, setQuantity] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const parsedPrice = parseFloat(purchasePrice);
    const parsedQuantity = parseFloat(quantity);
    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      console.error("El precio y la cantidad deben ser números válidos.");
      return;
    }
    onSubmit({
      name,
      ticker,
      purchasePrice: parsedPrice,
      quantity: parsedQuantity,
    });

    setName("");
    setTicker("");
    setPurchasePrice("");
    setQuantity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Nombre:</Label>
        <Input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="ticker">Ticker:</Label>
        <Input
          type="text"
          id="ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="purchasePrice">Precio de compra:</Label>
        <Input
          type="number"
          id="purchasePrice"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="quantity">Cantidad:</Label>
        <Input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit">Agregar Crypto</Button>
    </form>
  );
};

export default CryptoForm;
