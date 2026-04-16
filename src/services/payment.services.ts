/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";

export interface ICreateCheckoutSessionPayload {
  userId: string;
  mediaId?: string;
  amount: number;
  paymentType: "PURCHASE" | "RENT" | "SUBSCRIPTION";
}

export const createCheckoutSession = async (
  payload: ICreateCheckoutSessionPayload,
) => {
  try {
    const res = await httpClient.post<any>(
      "/payments/create-checkout-session",
      payload,
    );
    return res;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
