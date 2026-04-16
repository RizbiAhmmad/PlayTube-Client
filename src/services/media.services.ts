"use server"

import { httpClient } from "@/lib/axios/httpClient"
import { IMedia } from "@/types/media.types"

export const getMediaList = async (queryString: string) => {
  try {
    return await httpClient.get<IMedia[]>(
      queryString ? `/media?${queryString}` : "/media",
    )
  } catch (error) {
    console.error("Error fetching media list:", error)
    throw error
  }
}

export const createMedia = async (formData: FormData) => {
  try {
    return await httpClient.post<IMedia>("/media", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  } catch (error) {
    console.error("Error creating media:", error)
    throw error
  }
}

export const updateMedia = async (id: string, formData: FormData) => {
  try {
    return await httpClient.patch<IMedia>(`/media/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  } catch (error) {
    console.error("Error updating media:", error)
    throw error
  }
}

export const deleteMedia = async (id: string) => {
  try {
    return await httpClient.delete<boolean>(`/media/${id}`)
  } catch (error) {
    console.error("Error deleting media:", error)
    throw error
  }
}

export const getMediaById = async (id: string) => {
  try {
    return await httpClient.get<IMedia>(`/media/${id}`)
  } catch (error) {
    console.error("Error fetching media by id:", error)
    throw error
  }
}
