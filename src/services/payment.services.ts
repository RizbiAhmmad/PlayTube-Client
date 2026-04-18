/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPayment } from "@/types/dashboard.types";

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

export const getMyPayments = async () => {
  try {
    const res = await httpClient.get<IPayment[]>("/payments/my-payments");
    return res;
  } catch (error) {
    console.error("Error fetching payment history:", error);
    throw error;
  }
};

export const getAllPayments = async () => {
  try {
    const res = await httpClient.get<IPayment[]>("/payments/all-payments");
    return res;
  } catch (error) {
    console.error("Error fetching all payments:", error);
    throw error;
  }
};
