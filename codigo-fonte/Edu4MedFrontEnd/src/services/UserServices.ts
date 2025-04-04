import axios from "axios";

export interface User {
  id: string;
  nome: string;
  email: string;
  Senha: string;
}

const URL_DA_API = "https://localhost:44335/"; // alterar essa linha depois

const api = axios.create({
  baseURL: `${URL_DA_API}api/users`,
});

export const fetchUsers = async (): Promise<User[]> => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users");
  }
};

export const fetchUser = async (userId: string): Promise<User> => {
  try {
    const response = await api.get(`/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
