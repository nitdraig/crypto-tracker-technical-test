import { useMutation, useQuery, useQueryClient } from "react-query";

interface Crypto {
  id: string;
  name: string;
  ticker: string;
  purchasePrice: number;
  quantity: number;
}

export const useFetchCryptos = (token: string | null) => {
  return useQuery<Crypto[], Error>(
    "cryptos",
    async () => {
      const response = await fetch("http://localhost:5000/crypto/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch cryptos");
      }
      return response.json();
    },
    {
      enabled: !!token,
    }
  );
};

export const useAddCrypto = (token: string | null) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (newCrypto: {
      name: string;
      ticker: string;
      purchasePrice: number;
      quantity: number;
    }) => {
      const response = await fetch("http://localhost:5000/crypto/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(newCrypto),
      });
      if (!response.ok) {
        throw new Error("Failed to add crypto");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cryptos");
      },
    }
  );
};

export const useDeleteCrypto = (token: string | null) => {
  const queryClient = useQueryClient();
  return useMutation(
    async (cryptoId: string) => {
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
      if (!response.ok) {
        throw new Error("Failed to delete crypto");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cryptos");
      },
    }
  );
};

export const useUpdateCrypto = (token: string | null) => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({
      cryptoId,
      updatedCrypto,
    }: {
      cryptoId: string;
      updatedCrypto: Crypto;
    }) => {
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
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("cryptos");
      },
    }
  );
};
