export interface ApiService {
    fetchData<T>(url: string, method: string, options?: RequestInit): Promise<T>;
}