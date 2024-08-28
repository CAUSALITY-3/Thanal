import { apiPaths } from "./types";
import { logger } from "./lib";
import { revalidateCache } from "./utils";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const timeout = +(process.env.API_TIME_OUT || 15000);

export async function apiCall(
  method: string,
  path: string,
  nextOptions?: {
    revalidate?: false | number | undefined;
    tags?: string[];
    revalidateTags?: string[];
    revalidatePaths?: string[];
  },
  params: string = "",
  body?: any,
  headers?: any,
  errorReplacer?: any
) {
  try {
    const url = baseUrl + apiPaths[path] + params;
    const options = {
      method,
      headers,
      body,
      next: {
        revalidate: nextOptions?.revalidate,
        tags: nextOptions?.tags,
      },
    };
    logger("INFO", { url, ...options }, "calling DB service, http options ");
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const responseData = await response.json();
    revalidateCache(nextOptions?.revalidatePaths, nextOptions?.revalidateTags);
    logger(
      "INFO",
      responseData,
      "Successful response from DB service, responseData "
    );
    return responseData;
  } catch (error) {
    console.log("Sasi", error);
    logger("ERROR", error, "Error on DB service call, error ");
    if (errorReplacer) return errorReplacer;
    throw error;
  }
}
