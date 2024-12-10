import { ApiService } from "@/services/interfaces/IUApiservices";
import { TypeMethod } from "@/services/types/typeMethod";

const host = process.env.BACKEND_HOST || "http://localhost:8000/";

export class FetchApiService implements ApiService {
  async get<T>({ url, options }: { url: string; options?: RequestInit }): Promise<T> {
    return this.fetchData<T>({ url, method: "GET", options });
  }

  async post<T>({ url, body, options }: { url: string; body?: any; options?: RequestInit }): Promise<T> {
    const newOptions = {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    };
    return this.fetchData<T>({ url, method: "POST", options: newOptions });
  }
  

  async put<T>({ url, body, options }: { url: string; body?: any; options?: RequestInit }): Promise<T> {
    const newOptions = {
      ...options,
      body: body ? JSON.stringify(body) : undefined,
    };
    return this.fetchData<T>({ url, method: "PUT", options: newOptions });
  }

  async delete<T>({ url, options }: { url: string; options?: RequestInit }): Promise<T> {
    return this.fetchData<T>({ url, method: "DELETE", options });
  }

  private async fetchData<T>({ url, method, options }: { url: string; method: TypeMethod; options?: RequestInit }): Promise<T> {
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
      console.log('url:', `${host}${url}`);
      return response.json();
    } catch (error) {
      console.error('Error en la petición:', error);
      throw error; // Re-lanzamos el error para manejarlo en el consumidor
    }
  }
}
