import "./Home.scss";
import { Suspense } from "react";
import { Sections } from "./Sections";
import { apiCall } from "@/api/sevice";
import { ProductMainList } from "@/api/types";

export default async function Page() {
  const mainData: ProductMainList[] = await apiCall("get", "PRODUCT_MAINLIST");
  return (
    <div className="home">
      <div className="home-imageContainer">
        <img
          src={`${process.env.IMAGE_URL}/images/getImage?path=products/plants/plants.jpg`}
          alt="Picture of the author"
        />
      </div>

      <div className="sectionContainer">
        <Suspense fallback={<div>Loading</div>}>
          <Sections mainData={mainData} />
        </Suspense>
      </div>
    </div>
  );
}
