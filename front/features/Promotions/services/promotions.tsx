import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import { IUPromotion, IUPromotions } from "@/interfaces/IUPromotions";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { IUImg } from "@/interfaces/IUimg";
import { image } from "@nextui-org/react";
import { collectSegmentData } from "next/dist/server/app-render/collect-segment-data";
import { IUReview } from "@/interfaces/IUReview";
const api = new FetchApiService();

export const getPromotions = async () => {
  const response = await api.get<IUPromotions>({
    url: endPoints.promotions.get,
  });
  console.log("response: images", response);
  return response;
};