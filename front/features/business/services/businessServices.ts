
import { FetchApiService } from "@/services/api/FetchApiService"
import { IUBusiness } from "@/services/interfaces/IUBusiness"
import { endPoints } from "@/services/utils/endPoints"

const api = new FetchApiService()

export const getBusiness = async () => {
    let business: IUBusiness = await api.get<IUBusiness>({ url: endPoints.business.get })
    return business
}