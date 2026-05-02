/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { ingestMediaService, queryRagService } from "@/services/rag.services";

export const queryRagAction = async (query: string) => {
  try {
    const response = await queryRagService({ query });

    if (!response?.data?.answer) {
      return {
        success: false,
        error: "No answer received from AI. Please try again",
      };
    }

    let answer = response?.data?.answer;

    // if the answer is an object {medias: [...]} convert it to readable string
    if (typeof answer === "object" && answer !== null) {
      if ("medias" in answer && Array.isArray(answer.medias)) {
        const medias = answer.medias.slice(0, 5);

        if (medias.length > 0) {
          answer =
            `I found ${medias.length} items that may interest you:\n\n` +
            medias.map((m: any, i: number) => {
              let text = ``;
              if (m.title) text += `${i + 1}. **${m.title}**\n`;
              if (m.type) text += `Type: **${m.type}**\n`;
              if (m.reason) text += `Why: ${m.reason}\n`;
              return text + "\n";
            }).join("");
        } else {
          answer =
            "I couldn't find any media matching your query. Please try another query.";
        }
      } else {
        answer = JSON.stringify(answer, null, 2);
      }
    }
    
    // Similarity handling (similarity is 0-1, so 1 - similarity is distance, but here we probably want matching percentage)
    // Based on user's code: 100 - Number(similarity) * 100
    // Actually, usually similarity 0.8 means 80% match.
    const similarity = response?.data?.sources[0]?.similarity ?? 0;
    const matchPercentage = (Number(similarity) * 100).toFixed(2);

    return {
      success: true,
      answer: answer as string,
      sources: `${matchPercentage}% matched`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error:
        "Failed to reach the AI Assistant. Please check your connection and try again.",
    };
  }
};

export const ingestMediaAction = async () => {
  try {
    const response = await ingestMediaService();

    return {
      success: true,
      indexedCount: response.data.indexedCount,
      message:
        response.data.message ??
        "Media data synced successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "Failed to sync media data. Please try again.",
    };
  }
};

export const getUserRoleAction = async () => {
  try {
    const { getUserInfo } = await import("@/services/auth.services");
    const userInfo = await getUserInfo();
    return userInfo?.role ?? null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
