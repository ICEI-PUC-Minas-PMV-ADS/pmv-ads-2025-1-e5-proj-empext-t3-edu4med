import axios from "axios";
 
// Interface para Vestibular
export interface Vestibular {
  id: string;
  universidade: string;
  link: string;
  regiao: string;
  instituicao: string;
  vagas: string;
  fim_cadastro: string;
  link_inscricoes: string;
  data_prova: string;
  ativo: boolean;
}
 
// URL base da API de Vestibulares
const URL_DA_API = "https://localhost:44335/"; // lembre-se de ajustar para produção depois
 
const api = axios.create({
  baseURL: `${URL_DA_API}api/Vestibular`,
});
 
// Buscar todos os vestibulares
export const fetchVestibulares = async (): Promise<Vestibular[]> => {
  try {
    const response = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch vestibulares");
  }
};
 
// Buscar um vestibular específico pelo ID
export const fetchVestibular = async (vestibularId: string): Promise<Vestibular> => {
  try {
    const response = await api.get(`/${vestibularId}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch vestibular");
  }
};
 
// (Opcional) Criar um vestibular - exemplo de método POST
export const createVestibular = async (vestibular: Omit<Vestibular, "id">): Promise<Vestibular> => {
  try {
    const response = await api.post("/", vestibular);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create vestibular");
  }
};
