export interface EndPoint<T> {
    get({ Url }: { Url: string }): Promise<T>;
    post({ Url, data }: { Url: string; data: T }): Promise<T>;
}