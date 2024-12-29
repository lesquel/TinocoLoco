import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import { IUPromotions } from "@/interfaces/IUPromotions";

const api = new FetchApiService();

export const getPromotions = async () => {
  const response = await api.get<IUPromotions>({
    url: endPoints.promotions.get,
  });

  console.log("response: images", response);

  return response;
};
