import { ApiService } from "@/services/interfaces/IUApiservices"
export class FetchApiService implements ApiService {
  async fetchData<T>(url: string, method: string, options?: RequestInit): Promise<T> {
    const defaultOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
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