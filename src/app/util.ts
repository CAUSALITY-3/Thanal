import { start } from "../api/index";
import { Injector } from "@api/lib/injector";
import { ProductServices } from "@api/services/products";
import { AuthenticationServices } from "@api/services/authentication";
import { ProductFeatureServices } from "@api/services/productFeatures";
import { UserServices } from "@api/services/users";
import { InjectedType } from "@api/types/types";

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

export async function getservice<T>(serviceName: string):Promise<T> {
  const service = Injector.get(serviceName);
  if (service && Object.keys(service).length) return service as T;
  await start();
  return Injector.get(serviceName);
}
