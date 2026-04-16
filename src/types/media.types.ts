export type MediaType = "MOVIE" | "SERIES"
export type PricingType = "FREE" | "PREMIUM"

export interface IMedia {
  id: string
  title: string
  description: string
  type: MediaType
  releaseYear: number
  director: string
  cast: string[]
  genres: string[]
  trailerUrl?: string
  streamingUrl: string
  pricingType: PricingType
  price?: number
  thumbnail: string
  createdAt?: string | Date
  updatedAt?: string | Date
}

export interface ICreateMediaPayload {
  title: string
  description: string
  type: MediaType
  releaseYear: number
  director: string
  cast: string[]
  genres: string[]
  trailerUrl?: string
  streamingUrl: string
  pricingType: PricingType
  price?: number
}

export type IUpdateMediaPayload = Partial<ICreateMediaPayload>
