"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface IComment {
  id: string;
  content: string;
  userId: string;
  reviewId: string;
  parentId: string | null;
  createdAt: string;
  user?: {
    name: string;
    email: string;
  } | null;
  replies?: IComment[];
}

export const createComment = async (payload: { content: string, reviewId: string, parentId?: string }) => {
  const res = await httpClient.post<IComment>("/comments", payload);
  return res;
};

export const getCommentsByReview = async (reviewId: string) => {
  const res = await httpClient.get<IComment[]>(`/comments/${reviewId}`);
  return res;
};

export const updateComment = async (id: string, payload: { content: string }) => {
  const res = await httpClient.patch<IComment>(`/comments/${id}`, payload);
  return res;
};

export const deleteComment = async (id: string) => {
  const res = await httpClient.delete<IComment>(`/comments/${id}`);
  return res;
};
