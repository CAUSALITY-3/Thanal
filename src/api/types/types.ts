import { AuthenticationServices } from "@api/services/authentication";
import { ProductFeatureServices } from "@api/services/productFeatures";
import { ProductServices } from "@api/services/products";
import { UserServices } from "@api/services/users";

console.log("hamsa");

export type InjectedType = ProductServices | AuthenticationServices | ProductFeatureServices | UserServices
