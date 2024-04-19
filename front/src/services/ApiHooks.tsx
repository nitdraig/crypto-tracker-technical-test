import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth } from "./Auth";
interface Crypto {
  id: string;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
}

const fetchCryptos = async (token: string | null) => {
  if (!token) return [];
  const response = await fetch("http://localhost:5000/crypto/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return response.json();
};

const createCrypto = async (newCrypto: any, token: string | null) => {
  if (!token) return;
  const response = await fetch("http://localhost:5000/crypto/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(newCrypto),
  });
  return response.json();
};

const deleteCrypto = async (cryptoId: string, token: string | null) => {
  if (!token) return;
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
  return response.json();
};

const updateCrypto = async (
  cryptoId: string,
  updatedCrypto: Crypto,
  token: string | null
) => {
  if (!token) return;
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
  return response.json();
};

export const useFetchCryptos = () => {
  const { token } = useAuth();
  return useQuery<Crypto[], Error>(["cryptos"], () => fetchCryptos(token));
};

export const useAddCrypto = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<any, Error, any>(
    (newCrypto: any) => createCrypto(newCrypto, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cryptos");
      },
    }
  );
};

export const useDeleteCrypto = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<any, Error, string>(
    (cryptoId: string) => deleteCrypto(cryptoId, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cryptos");
      },
    }
  );
};

export const useUpdateCrypto = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  return useMutation<any, Error, { cryptoId: string; updatedCrypto: Crypto }>(
    (params: { cryptoId: string; updatedCrypto: Crypto }) =>
      updateCrypto(params.cryptoId, params.updatedCrypto, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cryptos");
      },
    }
  );
};
