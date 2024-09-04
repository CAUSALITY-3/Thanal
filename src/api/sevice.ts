import { apiPaths } from "./types";
import { logger } from "./lib";
import { revalidateCache } from "./utils";
import { getCookie, getCookieAndUpdateLocalStorage } from "@/app/util";

let baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
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
  let updatedAt: string = "";
  const isBrowser = typeof window === "object" && typeof document === "object";
  if (isBrowser) {
    const fullUrl = window.location.href;
    const currentBaseUrl = new URL(fullUrl).origin;
    baseUrl = currentBaseUrl + "/thanalApi/";
    console.log({ baseUrl });
    console.log("isBrowser", isBrowser);
  }

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

    if (isBrowser) {
      const user = isBrowser ? getCookie("user") : null;
      if (user) {
        const userData = JSON.parse(user);
        updatedAt = userData?.updatedAt;
      }
    }

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

    if (isBrowser) {
      const user = isBrowser ? getCookie("user") : null;
      if (user) {
        const userData = JSON.parse(user);
        if (updatedAt !== userData?.updatedAt) {
          getCookieAndUpdateLocalStorage("user");
        }
      }
    }
    return responseData;
  } catch (error) {
    console.log("Sasi", error);
    logger("ERROR", error, "Error on DB service call, error ");
    if (errorReplacer) return errorReplacer;
    throw error;
  }
}
