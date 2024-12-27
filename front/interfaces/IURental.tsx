import { PaymentMethod } from "@/types/paymentMethod";
import { StatusRental } from "@/types/statusRental";

export interface IURental {
  id: number;
  photos: string[];
  owner_rating?: number;
  costumer_rating?: number;
  current_status: {
    id: number;
    status: StatusRental;
    reason?: string;
    created_at: string;
    rental: number;
    changed_by: string;
  };
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