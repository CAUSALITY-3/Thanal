import { formData } from "./type";
import { apiCall } from "@/api/sevice";

export function addValidationFunction(formData: formData) {
  for (const form in formData) {
    if (formData[form].validationArray?.length) {
      const validation = [];
      for (const validate of formData[form].validationArray) {
        if (validate.method === "length") {
          if (Array.isArray(validate.value)) {
            validation.push(
              (k: string) =>
                k.length > validate.value[0] && k.length < validate.value[1]
            );
          } else {
            validation.push((k: string) => k.length === validate.value);
          }
        }
        if (validate.method === "includes") {
          validation.push((k: string) => k.includes(validate.value));
        }
        if (validate.method === "dropDown") {
          validation.push(
            (k: string) =>
              k &&
              formData[form].dropDownValues.find((txt: string) => txt === k)
          );
        }
      }
      formData[form].validation = validation;
    }
  }
  return formData;
}

export function getCookie(name: string) {
  const isBrowser = typeof window === "object" && typeof document === "object";
  if (!isBrowser || !document) return null;
  const value = `; ${document?.cookie}`;
  console.log("&&&&&", value);
  const parts = value?.split(`; ${name}=`);
  if (parts.length === 2) {
    const userCookie = parts.pop()?.split(";").shift();
    return userCookie ? decodeURIComponent(userCookie) : null;
  }
  return null;
}

export async function getUserDetails(
  data: any
): Promise<{ newData: boolean; loginRequired: boolean; cache: any }> {
  const user = await apiCall(
    "get",
    "GET_USER_DETAILS",
    {},
    `?email=${data.email}&updatedAt=${data.updatedAt}`
  );
  return user;
}

export async function getUserAuth() {
  const user = getCookie("user");
  const isBrowser = typeof window === "object" && typeof document === "object";
  console.log("!!!!!!!!!", typeof user, { user });
  if (user) return user;
  if (!isBrowser || !localStorage) return null;
  const data = localStorage.getItem("user");
  console.log("!!!!!!!!!", { data });
  if (!data) return null;
  const latestUserData = await getUserDetails(JSON.parse(data));
  const { newData, loginRequired, cache } = latestUserData;
  if (newData && cache) {
    localStorage.setItem("user", JSON.stringify(cache));
    return JSON.stringify(cache);
  }
  if (loginRequired) return null;
  return JSON.stringify(cache);
}

export function getCookieAndUpdateLocalStorage(name: string) {
  const user = getCookie(name);
  if (!user) return null;
  localStorage.setItem("user", user);
  return user;
}
