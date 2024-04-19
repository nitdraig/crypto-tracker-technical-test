import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.form`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 600px) {
    padding: 10px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 600px) {
    margin-bottom: 10px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 3px;
  border: 1px solid #ccc;

  @media screen and (max-width: 600px) {
    padding: 6px;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  @media screen and (max-width: 600px) {
    padding: 6px 12px;
  }
`;

const ButtonCancel = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 3px;
  background-color: #ff0040;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #b3001e;
  }

  @media screen and (max-width: 600px) {
    padding: 6px 12px;
  }
`;

interface Crypto {
  id: string;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
}

interface EditFormProps {
  crypto: Crypto;
  onUpdate: (updatedCrypto: Crypto) => void;
  onCancel: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ crypto, onUpdate, onCancel }) => {
  const [editedCrypto, setEditedCrypto] = useState<Crypto>(crypto);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedCrypto((prevCrypto) => ({
      ...prevCrypto,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(editedCrypto);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="name">Nombre:</Label>
        <Input
          type="text"
          id="name"
          value={editedCrypto.name}
          onChange={handleChange}
          name="name"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="ticker">Ticker:</Label>
        <Input
          type="text"
          id="ticker"
          value={editedCrypto.ticker}
          onChange={handleChange}
          name="ticker"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="purchasePrice">Precio de compra:</Label>
        <Input
          type="number"
          id="purchasePrice"
          value={editedCrypto.purchasePrice.toString()}
          onChange={handleChange}
          name="purchasePrice"
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="quantity">Cantidad:</Label>
        <Input
          type="number"
          id="quantity"
          value={editedCrypto.quantity.toString()}
          onChange={handleChange}
          name="quantity"
        />
      </FormGroup>
      <Button type="submit">Guardar</Button>
      <ButtonCancel type="button" onClick={onCancel}>
        Cancelar
      </ButtonCancel>
    </FormContainer>
  );
};

export default EditForm;
