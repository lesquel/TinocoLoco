import { IUImg } from "./IUimg";

export interface IUService {
  id: number;
  photos: IUImg[];
  view_count: number;
  is_active: boolean;
  creation_date: Date;
  last_actualization_date: Date;
  reservation_count: number;
  service_name: string;
  service_description: string;
  service_unitary_cost: number;
  service_category: number;
}

export interface IUServices {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  page_size: number;
  results: [IUService];
}

export interface IUCategory {
  id: number;
  view_count: number;
  is_active: boolean;
  creation_date: Date;
  last_actualization_date: Date;
  service_category_name: string;
  service_category_description: string;
  service_category_image: string;
  service_category_image_url: string;
}

export interface IUCategorys {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  page_size: number;
  results: [IUCategory];
}

export interface IUMostServicePopular {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  page_size: number;
  results: [IUService];
}

export interface IUMostServiceViewed {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  page_size: number;
  results: [IUService];
}
