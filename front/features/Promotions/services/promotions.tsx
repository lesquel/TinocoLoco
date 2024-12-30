import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import { IUPromotionCategory, IUPromotions } from "@/interfaces/IUPromotions";
import { IUCategorys } from "@/interfaces/IUevents";
import exp from "constants";
import { IUReview } from "@/interfaces/IUReview";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { construcUrl } from "@/services/utils/construcUrl";

const api = new FetchApiService();

export const getPromotions = async (options?: any) => {
  const response = await api.get<IUPromotions>({
    url: endPoints.promotions.get + (options ? construcUrl({ options }) : ""),
  });

  console.log("response: images", response);

  return response;
};

export const getMostPopularPromotions = async ({size}: {size?:number}) => {
  const response = await api.get<IUPromotions>({
    url: endPoints.promotions.mostPopular.get + (size ? `?page_size=${size}` : ""),
  });
  return response;
};

export const getMostViewedPromotions = async ({ size }: { size?: number }) => {
  const response = await api.get<IUPromotions>({
    url:
      endPoints.promotions.mostViewed.get + (size ? `?page_size=${size}` : ""),
  });
  return response;
};

export const getPromotionCategorys = async (id: number) => {
  const response = await api.get<IUPromotionCategory>({
    url:
      endPoints.promotions.categoty.get +
      id +
      endPoints.promotions.categoty.get,
  });
  return response;
};

export const getPromotionCategory = async (id: number) => {
  const response = await api.get<IUPromotionCategory>({
    url: endPoints.promotions.categoty.get + id,
  });
  return response;
};

export const getPromotionCategorysByCategory = async (id: number) => {
  const response = await api.get<IUCategorys>({
    url:
      endPoints.promotions.categoty.get +
      id +
      endPoints.promotions.categoty.post,
  });
  return response;
};

export const addReview = async (data: IUReview, id: number) => {
  const response = await api.post<IUReview>({
    url: endPoints.promotions.review.post,
    body: JSON.stringify(data),
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        "Content-Type": "application/json",
      },
    },
  });
  return response;
};
