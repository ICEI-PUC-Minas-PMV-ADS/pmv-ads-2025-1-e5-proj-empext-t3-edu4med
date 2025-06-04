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
const URL_DA_API = "https://webapiedu4med-b4h3hafmfcekhce9.brazilsouth-01.azurewebsites.net"; // lembre-se de ajustar para produção depois
 
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
 
// POST: Cria um novo edital
export const createVestibular = async (vestibular: Vestibular) => {
  try {
    const response = await axios.post(URL_DA_API, vestibular);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao criar vestibular: ${error}`);
  }
};

// PUT: Atualiza um edital existente
export const updateVestibular = async (id: number, vestibular: Vestibular) => {
  try {
    const response = await axios.put(`${URL_DA_API}/api/Vestibular/${id}`, vestibular);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao atualizar vestibular: ${error}`);
  }
};

// DELETE: Remove um edital
export const deleteVestibular = async (id: number) => {
  try {
    const response = await axios.delete(`${URL_DA_API}/api/Vestibular/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao deletar vestibular: ${error}`);
  }
};