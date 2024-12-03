import { Request_ } from "../../core/request.ts";
import type { IUBusiness } from "../../../types/IUBusiness.ts";
import type { EndPoint } from "../../../types/IUEndPoind.ts";

export class BusinessConfiguration implements EndPoint<IUBusiness> {
    private request: Request_;

    constructor(request: Request_) {
        this.request = request;
    }

    async get({ Url }: { Url: string }): Promise<IUBusiness> {
        const response = await this.request.get({ Url });
        return response as IUBusiness;
    }

    async post({ Url, data }: { Url: string; data: IUBusiness }): Promise<IUBusiness> {
        const response = await this.request.post({ Url, data });
        return response as IUBusiness;
    }
}
