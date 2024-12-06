import { ApiService } from "@/services/interfaces/IUApiservices"
import { TypeMethod } from "@/services/types/typeMethod";
const host = process.env.BACKEND_HOST
export class FetchApiService implements ApiService {
  async fetchData<T>({ url, method, options }: { url: string, method: TypeMethod, options?: RequestInit }): Promise<T> {
    const defaultOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(`${host}${url}`, defaultOptions);
      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.statusText}`);
      }
      return response.json();
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // Re-lanzamos el error para manejarlo en el consumidor
    }
  }
}