import { ApiService } from "@/interfaces/IUApiservices";
import { TypeMethod } from "@/types/typeMethod";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";

// const host = process.env.NEXT_PUBLIC_BACKEND_HOST || "http://localhost:8000/";
const host = process.env.BACKEND_HOST || "https://tinocoloco.onrender.com/";

export class FetchApiService implements ApiService {
  async get<T>({
    url,
    options,
  }: {
    url: string;
    options?: RequestInit;
  }): Promise<T> {
    console.log("url:", url);

    return this.fetchData<T>({ url, method: "GET", options });
  }

  async post<T>({
    url,
    body,
    options,
  }: {
    url: string;
    body?: any;
    options?: RequestInit;
  }): Promise<T> {
    const newOptions = {
      ...options,
      body: body,
    };

    console.log("newOptions:", newOptions);

    return this.fetchData<T>({ url, method: "POST", options: newOptions });
  }

  async put<T>({
    url,
    body,
    options,
  }: {
    url: string;
    body?: any;
    options?: RequestInit;
  }): Promise<T> {
    const newOptions = {
      ...options,
      body: body,
    };

    return this.fetchData<T>({ url, method: "PUT", options: newOptions });
  }

  async delete<T>({
    url,
    options,
  }: {
    url: string;
    options?: RequestInit;
  }): Promise<T> {
    return this.fetchData<T>({ url, method: "DELETE", options });
  }

  private async fetchData<T>({
    url,
    method,
    options,
  }: {
    url: string;
    method: TypeMethod;
    options?: RequestInit;
  }): Promise<T> {
    const defaultOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
      ...options,
    };

    console.log("defaultOptions:", defaultOptions);
    try {
      const response = await fetch(`${host}${url}`, defaultOptions);

      console.log("response:", response.status);

      if (response.status === 404) {
        throw new Error("No se encontró la información solicitada", {
          cause: "noFound",
        });
        // notFound()
      } else if (response.status !== 200) {
        toast.error("Error al enviar la petición", {
          style: {
            background: "#000000",
            color: "#FFEBE9",
          },
          iconTheme: {
            primary: "#FFEBE9",
            secondary: "#000000",
          },
        });
      }
      console.log("url:", `${host}${url}`);

      return response.json();
    } catch (error) {
      console.error("Error en la petición:", error);
      throw error; // Re-lanzamos el error para manejarlo en el consumidor
    }
  }
}
