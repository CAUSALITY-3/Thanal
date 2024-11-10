import "./Home.scss";
import { Suspense } from "react";
import { Sections } from "./Sections";
import ShimmerLoading from "@/Components/ShimmerLoading/ShimmerLoading";

export default async function Page() {
  return (
    <>
      <div className="home">
        <div className="home-imageContainer">
          <img
            loading="lazy"
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}pdt1.webp`}
            alt="Picture of the author"
          />
        </div>

        <div className="sectionContainer">
          <Suspense
            fallback={
              <div className="sections">
                <ShimmerLoading />
              </div>
            }
          >
            <Sections />
          </Suspense>
        </div>
      </div>
    </>
  );
}
