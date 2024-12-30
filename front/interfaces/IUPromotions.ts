export interface IUPromotion {
  id: number;
  promotion_image_url?: string;
  promotion_name: string;
  promotion_description: string;
  promotion_category: number;
  promotion_discount_percentage: number;
  reservation_count: number;
  valid_from: string;
  valid_until: string;
  promotion_image?: string;
}

export interface IUPromotionCategory {
  id: number;
  promotion_category_name: string;
  promotion_category_description: string;
  creation_date: string;
  is_active:  boolean;
  view_count: number;
}

export interface IUPromotions {
  count: number;
  next?: string;
  previous?: string;
  current_page?: number;
  amount_of_pages?: number;
  page_size: number;
  results: IUPromotion[];
}

