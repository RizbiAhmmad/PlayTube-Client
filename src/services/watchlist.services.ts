/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export const addToWatchlist = async (mediaId: string) => {
  try {
    const res = await httpClient.post<any>("/watchlist", { mediaId });
    return res;
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    throw error;
  }
};

export const getMyWatchlist = async () => {
  try {
    const res = await httpClient.get<any[]>("/watchlist/my-watchlist");
    return res;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw error;
  }
};

export const removeFromWatchlist = async (mediaId: string) => {
  try {
    const res = await httpClient.delete<any>(`/watchlist/${mediaId}`);
    return res;
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    throw error;
  }
};
