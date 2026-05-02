/* eslint-disable @typescript-eslint/no-explicit-any */
import { httpClient } from "@/lib/axios/httpClient";

export interface IRagQueryPayload {
  query: string;
  limit?: number;
  sourceType?: string;
}

export interface IRagSource {
  id: string;
  content: string;
  similarity: number;
  metadata?: {
    title?: string;
    [key: string]: unknown;
  };
  sourceType?: string;
}

export interface IRagQueryData {
  answer: any;
  sources: IRagSource[];
  contextUsed: boolean;
}

export interface IIngestMediaData {
  success: boolean;
  message: string;
  indexedCount: number;
}

export const queryRagService = async (payload: IRagQueryPayload) => {
  const response = await httpClient.post<IRagQueryData>("/rag/query", payload);
  return response;
};

export const ingestMediaService = async () => {
  const response = await httpClient.post<IIngestMediaData>(
    "/rag/ingest-media",
    {},
  );
  return response;
};
