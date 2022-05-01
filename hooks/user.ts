import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchJson } from "../lib/api";
import { IUser } from "../types/user";

interface SignInVariables {
  email: string;
  password: string;
}

interface UseSignInResult {
  signIn: (email: string, password: string) => Promise<boolean>;
  isError: boolean;
  isLoading: boolean;
}

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<SignInVariables, Error, IUser>(
    ({ email, password }) =>
      fetchJson("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
  );

  return {
    signIn: async (email: string, password: string) => {
      try {
        const user = await mutation.mutateAsync({ email, password });
        queryClient.setQueryData("user", user);
        return true;
      } catch (error) {
        return false;
      }
    },
    isError: mutation.isError,
    isLoading: mutation.isLoading,
  };
};

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(() => fetchJson("/api/logout"));

  return async () => {
    await mutation.mutateAsync();
    queryClient.setQueryData("user", undefined);
  };
};

export const useUser = () => {
  const query = useQuery(
    "user",
    async () => {
      try {
        return await fetchJson("/api/user");
      } catch (error) {
        return undefined;
      }
    },
    { cacheTime: Infinity, staleTime: 30 }
  );

  return query.data;
};
