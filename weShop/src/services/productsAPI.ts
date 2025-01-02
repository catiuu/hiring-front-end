import axios from "axios"


const BASE_URL = 'https://62d742f351e6e8f06f1a83da.mockapi.io/api/produtos';

/**
 * Faz a busca de produtos na API.
 * 
 * @param searchTerm (opcional) O termo de busca para filtrar produtos.
 * @returns Uma lista de produtos ou um erro.
 */
export const fetchProducts = async (searchTerm?: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: searchTerm ? { search: searchTerm } : {},
    });

    const products = response.data.map((product: any) => {
        const randomAvatar = Math.random().toString(36).substr(2, 9);
        return {
          ...product,
          avatar: `https://picsum.photos/seed/${randomAvatar}/640/480`,
        };
    });

    return products; 
          
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Não foi possível buscar os produtos.');
  }
};
