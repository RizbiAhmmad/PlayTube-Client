import { z } from "zod";

export const reviewZodSchema = z.object({
  rating: z.number().min(1, "Rating must be at least 1 star").max(10),
  content: z.string().min(10, "Review must be at least 10 characters"),
  spoiler: z.boolean(),
  tags: z.string(),
});

export type IReviewFormPayload = z.infer<typeof reviewZodSchema>;
