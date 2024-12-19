
import { FetchApiService } from "@/services/api/FetchApiService"
import { IUBusiness } from "@/interfaces/IUBusiness"
import { endPoints } from "@/config/endPoints"

const api = new FetchApiService()

export const getBusiness = async () => {
    let business: IUBusiness = await api.get<IUBusiness>({ url: endPoints.business.get })
    return business
}