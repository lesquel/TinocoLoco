import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import {
  IUCategorys,
  IUEvents,
  IUEvent,
  IUMostEventPopular,
  IUMostEventViewed,
  IUCategory,
} from "@/interfaces/IUevents";
import { construcUrl } from "@/services/utils/construcUrl";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { IUUploadPhoto } from "@/interfaces/IUimg";
import { IUReview, IUReviews } from "@/interfaces/IUReview";
const api = new FetchApiService();

export const getMostPopularEvents = async ({size = 4}: {size?: number}) => {
  const response = await api.get<IUMostEventPopular>({
    url: endPoints.events.event.mostPopular.get + (size ? `?page_size=${size}` : ""),
  });

  return response;
};

export const getMostViewedEvents = async ({size = 4}: {size?: number}) => {
  const response = await api.get<IUMostEventViewed>({
    url: endPoints.events.event.mostViewed.get + (size ? `?page_size=${size}` : ""),
  });

  return response;
};


export const getBetterRatedEvents = async ({size = 4}: {size?: number}) => {
  const response = await api.get<IUMostEventViewed>({
    url: endPoints.events.event.betterRated.get + (size ? `?page_size=${size}` : ""),
  });

  return response;
};

export const getEvents = async (options?: any) => {
  const url = endPoints.events.get + (options ? construcUrl({ options }) : "");

  console.log("url:", url);
  const response = await api.get<IUEvents>({ url });

  return response;
};

export const getEvent = async (id: number) => {
  const url = endPoints.events.get + id + "/";

  console.log("url:", url);
  const response = await api.get<IUEvent>({ url });

  return response;
};

export const getCategorys = async (options?: any) => {
  const url =
    endPoints.events.category.get + (options ? construcUrl({ options }) : "");
  const response = await api.get<IUCategorys>({ url });

  return response;
};

export const getCategory = async (id: number) => {
  const url = endPoints.events.category.get + id + "/";
  const response = await api.get<IUCategory>({ url });

  return response;
};

export const uploadPhoto = async ({
  data,
  idEvent,
}: {
  data: File[];
  idEvent: number;
}) => {
  const formData = new FormData();

  data.forEach((file) => {
    formData.append("images", file); // Agregar archivo
  });

  // Realizar la solicitud POST
  const response = await api.post<IUUploadPhoto>({
    url: endPoints.events.get + idEvent + endPoints.events.image.post,
    body: formData, // Pasar directamente el FormData
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`, // Incluir solo el token
      },
    },
  });

  return response;
};

export const createEvent = async (data: IUEvent) => {
  const response = await api.post<IUEvent>({
    url: endPoints.events.post,
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
  formData.append("event_category_name", data.event_category_name);
  formData.append(
    "event_category_description",
    data.event_category_description,
  );
  formData.append("is_active", data.is_active.toString()); // Convertir booleano a string
  formData.append("event_category_image", data.event_category_image[0]); // Agregar archivo

  const response = await api.post<IUCategory>({
    url: endPoints.events.category.post,
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
  const response = await api.get<IUReviews>({
    url: endPoints.events.get + id + endPoints.events.reviews.get,
  });

  return response;
};

export const addReview = async (data: IUReview, id: number) => {
  const response = await api.post<IUReview>({
    url: endPoints.events.get + data.id + endPoints.events.reviews.post,
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
