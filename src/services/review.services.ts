"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface ICreateReviewPayload {
  mediaId: string;
  rating: number;
  content: string;
  spoiler?: boolean;
  tags?: string[];
}

export interface IReview {
  id: string;
  rating: number;
  content: string;
  spoiler: boolean;
  tags: string[];
  status: "PENDING" | "APPROVED" | "REJECTED";
  userId: string;
  mediaId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  } | null;
  media?: {
    id: string;
    title: string;
    thumbnail: string | null;
    type: string;
  } | null;
  _count?: {
    likes: number;
    comments: number;
  };
}

export const createReview = async (payload: ICreateReviewPayload) => {
  const res = await httpClient.post<IReview>("/reviews", payload);
  return res;
};

export const getMyReviews = async () => {
  const res = await httpClient.get<IReview[]>("/reviews/my-reviews");
  return res;
};

export const getReviewsByMedia = async (mediaId: string) => {
  const res = await httpClient.get<IReview[]>(`/reviews/media/${mediaId}`);
  return res;
};

export const deleteMyReview = async (reviewId: string) => {
  const res = await httpClient.delete<IReview>(`/reviews/${reviewId}`);
  return res;
};

export const updateReviewStatus = async (
  reviewId: string,
  status: "APPROVED" | "REJECTED",
) => {
  const res = await httpClient.patch<IReview>(`/reviews/${reviewId}`, {
    status,
  });
  return res;
};
