import { Injector } from "./lib/injector";
import { dbConnect } from "./model/DB";
import { injectServices } from "./serviceInjector";

console.log(process.env.HELLO);


export async function start() {

  const serviceInitialization:string = Injector.get("serviceInitialization");
  console.log("serviceInitialized", serviceInitialization)
  if(!["done", "inprogress"].includes(serviceInitialization)){
    Injector.bind("inprogress", "serviceInitialization");
    await dbConnect();
    console.log("cr7");
    await injectServices();
    Injector.update("done", "serviceInitialization");
  }
}
