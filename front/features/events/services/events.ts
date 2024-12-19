import { FetchApiService } from "@/services/api/FetchApiService";
import { endPoints } from "@/config/endPoints";
import { IUCategorys, IUEvents, IUEvent, IUMostEventPopular, IUMostEventViewed, IUOneEvent, IUCategory } from "@/interfaces/IUevents";
import { IUConstrucUrl } from "@/interfaces/IUConstrucUrl";
import { construcUrl } from "@/services/utils/construcUrl";
const api = new FetchApiService();

export const getMostPopularEvents = async (): Promise<IUMostEventPopular> => {
    const response = await api.get<IUMostEventPopular>({ url: endPoints.events.event.mostPopular.get });
    return response;
}

export const getMostViewedEvents = async (): Promise<IUMostEventViewed> => {
    const response = await api.get<IUMostEventViewed>({ url: endPoints.events.event.mostViewed.get });
    return response;
}


export const getEvents = async (options?: any) => {
    const url = endPoints.events.get + (options ? construcUrl({ options }) : '');
    console.log('url:', url);
    const response = await api.get<IUEvents>({ url });
    return response;
};

export const getEvent = async (id: number) => {
    const url = endPoints.events.get + id + '/';
    console.log('url:', url);
    const response = await api.get<IUOneEvent>({ url });
    return response;
};


export const getCategorys = async (options?: any) => {
    const url = endPoints.events.category.get + (options ? construcUrl({ options }) : '');
    const response = await api.get<IUCategorys>({ url });
    return response;
}

export const getCategory = async (id: number) => {
    const url = endPoints.events.category.get + id + '/';
    const response = await api.get<IUCategory>({ url });
    return response;
};