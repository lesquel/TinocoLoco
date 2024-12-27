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