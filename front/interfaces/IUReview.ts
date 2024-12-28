export interface IUReview {
  id: number;
  object_id: number;
  rating_score: number;
  rating_comment: string;
  created_at: string;
  review: string;
  owner: number;
  content_type: string;
}

export interface IUReviews {
  count: number;
  next?: string;
  previous?: string;
  current_page: number;
  page_size: number;
  results: [IUReview];
}
