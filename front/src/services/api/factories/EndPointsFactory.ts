import {BusinessConfiguration} from "../endpoints/BusinessConfiguration"
import { Request_ } from "../../core/request";
export  class EndPointsFactory {
    private backend_url: string;
    private request: Request_;

    constructor({ Url }: { Url: string }) {
        this.backend_url = Url;
        this.request = new Request_({ baseUrl: this.backend_url });
    }

    BusinessConfigurations(): BusinessConfiguration {
        return new BusinessConfiguration(this.request);
    }
}
