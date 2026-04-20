"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IUser } from "@/types/user.types";

export const getAllUsers = async () => {
  try {
    return await httpClient.get<IUser[]>("/admins/users/all");
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

export const changeUserStatus = async (userId: string, userStatus: string) => {
  try {
    return await httpClient.patch("/admins/change-user-status", {
      userId,
      userStatus,
    });
  } catch (error) {
    console.error("Error changing user status:", error);
    throw error;
  }
};

export const changeUserRole = async (userId: string, role: string) => {
  try {
    return await httpClient.patch("/admins/change-user-role", {
      userId,
      role,
    });
  } catch (error) {
    console.error("Error changing user role:", error);
    throw error;
  }
};

export const deleteUser = async (userId: string) => {
  try {
    return await httpClient.delete(`/admins/users/${userId}`);
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
