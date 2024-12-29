import { PaymentMethod } from "@/types/paymentMethod";
import { StatusRental } from "@/types/statusRental";
import { IUService } from "./IUservices";

export interface IURental {
  id: number;
  photos: string[];
  owner_rating?: {
    id: number;
    object_id: number;
    rating_score: number;
    rating_comment: string;
    created_at: string;
    owner: number;
    content_type: number;
  };
  costumer_rating?: {
    id: number;
    object_id: number;
    rating_score: number;
    rating_comment: string;
    created_at: string;
    owner: number;
    content_type: number;
  };
  current_status: {
    id: number;
    status: StatusRental;
    reason?: string;
    created_at: string;
    rental: number;
    changed_by: string;
  };
  event_rental_services: number[];
  event_rental_date: string;
  event_rental_start_time: string;
  event_rental_planified_end_time: string;
  event_rental_end_time: string;
  event_rental_cost: number;
  event_rental_cancelled_value_in_advance: number;
  event_rental_payment_method: PaymentMethod;
  event_rental_observation: string;
  event_rental_min_attendees: number;
  event_rental_max_attendees: number;
  event_rental_creation_date: string;
  view_count: number;
  confirmation_code: string;
  event: number;
  owner: number;
  promotions: number[];
}
export interface IURentals {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  amount_of_pages: number;
  page_size: number;
  results: IURental[];
}

export interface IUServiceToRentalAdd {
  service_id: number;
  service_quantity: number;
  description: string;
  service_observation: string;
}

export interface IUServicesToRental {
  id: number;
  price: string;
  service_quantity: number;
  status: string;
  description: string;
  service_observation: string;
  event_rental: number;
  service: IUService;
}