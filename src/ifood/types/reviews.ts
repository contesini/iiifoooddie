export interface ReviewResponse {
  page: number;
  size: number;
  reviews: Review[];
  total: number;
  pageCount: number;
}

export interface Review {
  id: string;
  comment: string;
  createdAt: string;
  discarded: boolean;
  moderated: boolean;
  moderationStatus: string;
  reply: string;
  order: Order;
  score: number;
  surveyId: string;
  published: boolean;
  customerName: string;
  questions: Question[];
}

export interface Order {
  id: string;
  createdAt: string;
}


interface Question {
  id: string;
  type: string;
  title: string;
  answers: Answer[];
}

interface Answer {
  id: string;
  title: string;
}
