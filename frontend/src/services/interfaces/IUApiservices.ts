import { TypeMethod } from "@/services/types/typeMethod"
export interface ApiService {
    fetchData<T>({ url, method, options }: { url: string, method: TypeMethod, options?: RequestInit }): Promise<T>;
}