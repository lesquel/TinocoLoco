import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import { IUPromotions } from "@/interfaces/IUPromotions";
import { IUCategorys } from "@/interfaces/IUevents";

const api = new FetchApiService();

export const getPromotions = async () => {
  const response = await api.get<IUPromotions>({
    url: endPoints.promotions.get,
  });

  console.log("response: images", response);

  return response;
};



export const getMostPopularPromotions = async () => {
  const response = await api.get<IUPromotions>({
    url: endPoints.promotions.mostPopular.get,
  });
  return response;
}

export const getMostViewedPromotions = async () => {
  const response = await api.get<IUPromotions>({
    url: endPoints.promotions.mostViewed.get,
  });
  return response;
}

export const getPromotionCategorys = async () => {
  const response = await api.get<IUCategorys>({
    url: endPoints.promotions.categoty.get,
  });
  return response;
}

