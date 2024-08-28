// import { start } from "../api/index";
// import { Injector } from "@api/lib/injector";
// import { ProductServices } from "@api/services/products";
// import { AuthenticationServices } from "@api/services/authentication";
// import { ProductFeatureServices } from "@api/services/productFeatures";
// import { UserServices } from "@api/services/users";
// import { InjectedType } from "@api/types/types";
// import { getServerSession } from "next-auth";
import { formData } from "./type";
// import { options } from "./api/auth/[...nextauth]/options";
import { apiCall } from "@/api/sevice";

// const returnType = (servicename: string) => {
//   switch (servicename) {
//     case "productService":
//       return ProductServices;
//     case "productFeatureServices":
//       return ProductFeatureServices;
//     case "userServices":
//       return UserServices;
//     case "authenticationServices":
//       return AuthenticationServices;
//     default:
//       return UserServices;
//   }
// };

// export async function getservice<T>(serviceName: string): Promise<T> {
//   const service = Injector.get(serviceName);
//   if (service && Object.keys(service).length) return service as T;
//   await start();
//   return Injector.get(serviceName);
// }

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

// expors

export function getCookie(name: string) {
  if (!document) null;
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
  console.log("!!!!!!!!!", typeof user, { user });
  if (user) return user;
  if (!localStorage) return null;
  const data = localStorage.getItem("user");
  console.log("!!!!!!!!!", { data });
  if (!data) return null;
  const latestUserData = await getUserDetails(JSON.parse(data));
  const { newData, loginRequired, cache } = latestUserData;
  if (newData) {
    localStorage.setItem("user", JSON.stringify(cache));
    return JSON.stringify(cache);
  }
  if (loginRequired) return null;
  return JSON.stringify(cache);
}
