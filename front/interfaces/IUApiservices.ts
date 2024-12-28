export interface ApiService {
  get<T>({ url, options }: { url: string; options?: RequestInit }): Promise<T>;
  post<T>({
    url,
    body,
    options,
  }: {
    url: string;
    body?: any;
    options?: RequestInit;
  }): Promise<T>;
  put<T>({
    url,
    body,
    options,
  }: {
    url: string;
    body?: any;
    options?: RequestInit;
  }): Promise<T>;
  delete<T>({
    url,
    options,
  }: {
    url: string;
    options?: RequestInit;
  }): Promise<T>;
}
