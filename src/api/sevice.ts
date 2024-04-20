import axios from "axios";
import { apiPaths } from "./types";
import { logger } from "./lib";
const baseUrl = process.env.API_BASE_URL;
const timeout = +(process.env.API_TIME_OUT || 15000);

export async function dbCall(
  method: string,
  path: string,
  params: string = "",
  data?: any,
  headers?:any,
  errorReplacer?: any
) {
  try {
    const options = {
      method,
      url: baseUrl + apiPaths[path] + params,
      headers,
      timeout,
      data,
    };
    logger("INFO", options, "calling DB service, http options ");
    let responseData: any;
    if (method === 'get') {
        const response = await fetch(options.url, { next: { revalidate: 60 } })
        responseData = await response.json()
    } else {
        const response = await axios(options);
        responseData = response.data;
    }
    
    logger(
      "INFO",
      responseData,
      "Successful response from DB service, responseData "
    );
    return responseData;
  } catch (error) {
    logger("ERROR", error, "Error on DB service call, error ");
    if (errorReplacer) return errorReplacer;
    throw error;
  }
}
