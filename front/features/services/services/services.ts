import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import { IUServices, IUService, IUMostServicePopular, IUMostServiceViewed } from "@/interfaces/IUservices";
import { construcUrl } from "@/services/utils/construcUrl";
import { IUCategory, IUCategorys } from "@/interfaces/IUevents";
const api = new FetchApiService();

export const getMostPopularServices = async (): Promise<IUMostServicePopular> => {
    const response = await api.get<IUMostServicePopular>({ url: endPoints.services.service.mostPopular.get });
    return response;
}

export const getMostViewedServices = async (): Promise<IUMostServiceViewed> => {
    const response = await api.get<IUMostServiceViewed>({ url: endPoints.services.service.mostViewed.get });
    return response;
}

export const getServices = async (options?: any) => {
    const response = await api.get<IUServices>({ url: endPoints.services.get + construcUrl({ options }) });
    return response;
}

export const getService = async (id: number) => {
    const url = endPoints.services.get + id + '/';
    const response = await api.get<IUService>({ url });
    return response;
};

export const getServiceCategory = async (id: number) => {
    const url = endPoints.services.category.get + id + '/';
    const response = await api.get<IUCategory>({ url });
    return response;
};

export const getServiceCategorys = async (options?: any) => {
    const url = endPoints.services.category.get + (options ? construcUrl({ options }) : '');
    const response = await api.get<IUCategorys>({ url });
    return response;
}

export const getCategory = async (id: number) => {
    const url = endPoints.services.category.get + id + '/';
    const response = await api.get<IUCategory>({ url });
    return response;
};