import { z } from "zod"

export const createMediaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z.enum(["MOVIE", "SERIES"]),
  releaseYear: z.coerce.number().int(),
  director: z.string().min(1, "Director is required"),
  cast: z.array(z.string()).min(1, "At least one cast member is required"),
  genres: z.array(z.string()).min(1, "At least one genre is required"),
  trailerUrl: z.string().url().optional().or(z.literal("")),
  streamingUrl: z.string().min(1, "Streaming URL is required"),
  pricingType: z.enum(["FREE", "PREMIUM"]),
  price: z.coerce.number().optional().default(0),
})

export const updateMediaSchema = createMediaSchema.partial()

export type ICreateMediaFormValues = z.infer<typeof createMediaSchema>
export type IUpdateMediaFormValues = z.infer<typeof updateMediaSchema>
