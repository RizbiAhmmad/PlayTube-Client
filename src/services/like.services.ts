"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface ILike {
  id: string;
  userId: string;
  reviewId: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export const toggleLike = async (reviewId: string) => {
  const res = await httpClient.post<ILike | null>("/likes/toggle", { reviewId });
  return res;
};

export const getLikesByReview = async (reviewId: string) => {
  const res = await httpClient.get<ILike[]>(`/likes/${reviewId}`);
  return res;
};
