import { FetchApiService } from "@/services/api/FetchApiService"
import { IUBusiness } from "@/services/interfaces/IUBusiness"
import { endPoints } from "@/services/utils/endPoints"

const api = new FetchApiService()

export const getBusiness = async () => {
    return api.fetchData<IUBusiness>({
        url: endPoints.business.get,
        method: "GET",
    })
}