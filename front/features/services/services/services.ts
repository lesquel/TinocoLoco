import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import {
  IUServices,
  IUService,
  IUMostServicePopular,
  IUMostServiceViewed,
} from "@/interfaces/IUservices";
import { construcUrl } from "@/services/utils/construcUrl";
import { IUCategory, IUCategorys } from "@/interfaces/IUevents";
import { IUUploadPhoto } from "@/interfaces/IUimg";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { IUReview } from "@/interfaces/IUReview";
const api = new FetchApiService();

export const getMostPopularServices = async ({
  size,
}: {
  size?: number;
}): Promise<IUMostServicePopular> => {
  const response = await api.get<IUMostServicePopular>({
    url:
      endPoints.services.service.mostPopular.get +
      (size ? `?page_size=${size}` : ""),
  });

  return response;
};

export const getMostViewedServices = async ({
  size,
}: {
  size?: number;
}): Promise<IUMostServiceViewed> => {
  const response = await api.get<IUMostServiceViewed>({
    url:
      endPoints.services.service.mostViewed.get +
      (size ? `?page_size=${size}` : ""),
  });

  return response;
};

export const getMostRankingServices = async ({size = 4}: {size?: number}) => {
  const response = await api.get<IUMostServiceViewed>({
    url: endPoints.services.service.betterRated.get + (size ? `?page_size=${size}` : ""),
  });

  return response;
};

export const getServices = async (options?: any) => {
  const response = await api.get<IUServices>({
    url: endPoints.services.get + (options ? construcUrl({ options }) : ""),
  });
  return response;
};

export const getService = async (id: number) => {
  const url = endPoints.services.get + id + "/";
  const response = await api.get<IUService>({ url });

  return response;
};

export const getServiceCategory = async (id: number) => {
  const url = endPoints.services.category.get + id + "/";
  const response = await api.get<IUCategory>({ url });

  return response;
};

export const getServiceCategorys = async (options?: any) => {
  const url =
    endPoints.services.category.get + (options ? construcUrl({ options }) : "");
  const response = await api.get<IUCategorys>({ url });

  return response;
};

export const uploadPhoto = async ({
  data,
  idService,
}: {
  data: File[];
  idService: number;
}) => {
  const formData = new FormData();

  data.forEach((file) => {
    formData.append("images", file); // Agregar archivo
  });

  console.log("idddddddd", idService);

  // Realizar la solicitud POST
  const response = await api.post<IUUploadPhoto>({
    url: endPoints.services.get + idService + endPoints.services.image.post,
    body: formData, // Pasar directamente el FormData
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`, // Incluir solo el token
      },
    },
  });

  return response;
};

export const createService = async (data: IUService) => {
  const response = await api.post<IUService>({
    url: endPoints.services.post,
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

export const createCategory = async (data: IUCategory) => {
  const formData = new FormData();

  console.log("data:", data);
  formData.append("service_category_name", data.event_category_name);
  formData.append(
    "service_category_description",
    data.event_category_description,
  );
  formData.append("is_active", data.is_active.toString()); // Convertir booleano a string
  formData.append("service_category_image", data.event_category_image[0]); // Agregar archivo

  const response = await api.post<IUCategory>({
    url: endPoints.services.category.post,
    body: formData, // Usar FormData como cuerpo
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        // No incluir "Content-Type"
      },
    },
  });

  return response;
};

export const getReviews = async (id: number) => {
  const response = await api.get<IUReview>({
    url: endPoints.services.get + id + endPoints.services.reviews.get,
  });

  return response;
};

export const addReview = async (data: IUReview, id: number) => {
  const response = await api.post<IUReview>({
    url: endPoints.services.get + data.id + endPoints.services.reviews.post,
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
