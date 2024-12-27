import { endPoints } from "@/config/endPoints";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import { IURentals } from "@/interfaces/IURental";
import { FetchApiService } from "@/services/api/FetchApiService";

const api = new FetchApiService();

export const getRentals = async () => {
    const response = await api.get<IURentals>({
        url: endPoints.rentals.get,
        options: {
            headers: {
                "Authorization": `token ${getTokenFromCookie()?.token}`,
            }
        }
    });
    return response;
}


export const getMyRentals = async () => {
    const response = await api.get<IURentals>({
        url: endPoints.rentals.myRentals.get,
        options: {
            headers: {
                "Authorization": `token ${getTokenFromCookie()?.token}`,
            }
        }
    });
    return response;
}


export const confirmRental = async (data: any) => {
    const response = await api.post<IURentals>({
        url: endPoints.rentals.confirmRental.post,
        body: JSON.stringify(data),
        options: {
            headers: {
                "Authorization": `token ${getTokenFromCookie()?.token}`,
                "Content-Type": "application/json",
            },
        },
    });
    return response;
}

export const createRental = async (data: any) => {
    const response = await api.post<IURentals>({
        url: endPoints.rentals.post,
        body: JSON.stringify(data),
        options: {
            headers: {
                "Authorization": `token ${getTokenFromCookie()?.token}`,
                "Content-Type": "application/json",
            },
        },
    });
    return response;
}

export const updateRental = async (data: any) => {
    const response = await api.put<IURentals>({
        url: endPoints.rentals.put,
        body: JSON.stringify(data),
        options: {
            headers: {
                "Authorization": `token ${getTokenFromCookie()?.token}`,
                "Content-Type": "application/json",
            },
        },
    });
    return response;
}

export const addServiceToRental = async (data: any) => {
    const response = await api.post<IURentals>({
        url: endPoints.rentals.services.get,
        body: JSON.stringify(data),
        options: {
            headers: {
                "Authorization": `token ${getTokenFromCookie()?.token}`,
                "Content-Type": "application/json",
            },
        },
    });
    return response;
}

export const removeServiceFromRental = async (data: any) => {
    const response = await api.delete<IURentals>({
        url: endPoints.rentals.services.get,
        options: {
            headers: {
                "Authorization": `token ${getTokenFromCookie()?.token}`,
                "Content-Type": "application/json",
            },
        },
    });
    return response;
}
