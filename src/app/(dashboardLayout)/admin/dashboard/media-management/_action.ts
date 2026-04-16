"use server"

import {
  createMedia,
  deleteMedia,
  getMediaById,
  updateMedia,
} from "@/services/media.services"
import { type ApiErrorResponse, type ApiResponse } from "@/types/api.types"
import { type IMedia } from "@/types/media.types"
import {
  createMediaSchema,
} from "@/zod/media.validation"

const getActionErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (
    error &&
    typeof error === "object" &&
    "response" in error &&
    error.response &&
    typeof error.response === "object" &&
    "data" in error.response &&
    error.response.data &&
    typeof error.response.data === "object" &&
    "message" in error.response.data &&
    typeof error.response.data.message === "string"
  ) {
    return error.response.data.message
  }

  if (error instanceof Error) {
    return error.message
  }

  return fallbackMessage
}

export const createMediaAction = async (
  formData: FormData,
): Promise<ApiResponse<IMedia> | ApiErrorResponse> => {
  try {
    // Validate fields before sending to service
    const rawData = Object.fromEntries(formData.entries())
    
    // Convert JSON strings back to arrays for validation
    const cast = rawData.cast ? JSON.parse(rawData.cast as string) : []
    const genres = rawData.genres ? JSON.parse(rawData.genres as string) : []
    
    const validatedData = createMediaSchema.safeParse({
      ...rawData,
      cast,
      genres,
    })

    if (!validatedData.success) {
      return {
        success: false,
        message: validatedData.error.issues[0]?.message || "Invalid input",
      }
    }

    return await createMedia(formData)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to create media"),
    }
  }
}

export const updateMediaAction = async (
  id: string,
  formData: FormData,
): Promise<ApiResponse<IMedia> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid media id",
    }
  }

  try {
    return await updateMedia(id, formData)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to update media"),
    }
  }
}

export const deleteMediaAction = async (
  id: string,
): Promise<ApiResponse<boolean> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid media id",
    }
  }

  try {
    return await deleteMedia(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to delete media"),
    }
  }
}

export const getMediaByIdAction = async (
  id: string,
): Promise<ApiResponse<IMedia> | ApiErrorResponse> => {
  if (!id) {
    return {
      success: false,
      message: "Invalid media id",
    }
  }

  try {
    return await getMediaById(id)
  } catch (error: unknown) {
    return {
      success: false,
      message: getActionErrorMessage(error, "Failed to fetch media details"),
    }
  }
}
