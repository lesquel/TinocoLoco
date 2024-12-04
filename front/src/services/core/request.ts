export class Request_ {
    private httpClient: typeof fetch;
    private baseUrl: string;

    constructor({baseUrl}: { baseUrl: string }) {
        this.httpClient = fetch;
        this.baseUrl = baseUrl ?? import.meta.env.BACKEND_HOST;
    }

    async get({ Url }: { Url: string }) {
        return this.fetchRequest({ Url, method: "GET" });
    }

    async post({ Url, data }: { Url: string; data: any }) {
        return this.fetchRequest({ Url, method: "POST", body: JSON.stringify(data) });
    }

    private async fetchRequest({ Url, method, body }: { Url: string; method: string; body?: string }) {
        const res = await this.httpClient(`${this.baseUrl}${Url}`, {
            method,
            headers: { "Content-Type": "application/json" },
            body,
        });

        if (!res.ok) throw new Error(`Error en la solicitud: ${res.status} ${res.statusText}`);

        return await res.json();
    }
}
