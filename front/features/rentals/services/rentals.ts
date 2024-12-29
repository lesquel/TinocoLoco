import { endPoints } from "@/config/endPoints";
import { getTokenFromCookie } from "@/features/auth/utils/getUserInfo";
import {
  IURental,
  IURentals,
  IUServicesToRental,
  IUServiceToRentalAdd,
} from "@/interfaces/IURental";
import { IUReview } from "@/interfaces/IUReview";
import { FetchApiService } from "@/services/api/FetchApiService";
import { construcUrl } from "@/services/utils/construcUrl";

const api = new FetchApiService();

export const getRentals = async () => {
  const response = await api.get<IURentals>({
    url: endPoints.rentals.get,
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
      },
    },
  });

  return response;
};

export const getRental = async (id: number) => {
  const response = await api.get<IURental>({
    url: endPoints.rentals.get + id,
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
      },
    },
  });

  return response;
};

export const getMyRentals = async ({ options }: { options?: any }) => {
  const response = await api.get<IURentals>({
    url:
      endPoints.rentals.myRentals.get +
      (options ? construcUrl({ options }) : ""),
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
      },
    },
  });

  return response;
};

export const confirmRental = async ({data}: {data: any}) => {
  const response = await api.post<IURentals>({
    url: endPoints.rentals.confirmRentalEmail.post,
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

export const sendConfirmationEmail = async (data: any) => {
  const response = await api.post<IURentals>({
    url: endPoints.rentals.get + data.idRental + endPoints.rentals.confirmRental.post,
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

export const createRental = async (data: any) => {
  const response = await api.post<IURentals>({
    url: endPoints.rentals.post,
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

export const updateRental = async (data: any) => {
  const response = await api.put<IURentals>({
    url: endPoints.rentals.put,
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

export const removeServiceFromRental = async (data: any) => {
  const response = await api.delete<IURentals>({
    url: endPoints.rentals.services.get,
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        "Content-Type": "application/json",
      },
    },
  });

  return response;
};

export const addServiceToRental = async ({
  data,
  rentalId,
}: {
  data: any;
  rentalId: number;
}) => {
  const response = await api.post<IUServiceToRentalAdd>({
    url: endPoints.rentals.get + rentalId + endPoints.rentals.services.post,
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

export const addReview = async (data: IUReview, id: number) => {
  const response = await api.post<IUReview>({
    url: endPoints.rentals.get + data.id + endPoints.rentals.reviews.post,
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



export const getServicesToRental = async ({ rentalId }: { rentalId: number }) => {
  const response = await api.get<IUServicesToRental[]>({
    url: endPoints.rentals.get + rentalId + endPoints.rentals.services.get,
    options: {
      headers: {
        Authorization: `token ${getTokenFromCookie()?.token}`,
        "Content-Type": "application/json",
      },
    },
  });
  return response;
}