import "./Home.scss";
import * as stylex from "@stylexjs/stylex";
import { Suspense } from "react";
import { Sections } from "./Sections";
import Image from "next/image";
import homePage from "@public/homePage.jpg";
import { apiCall } from "@/api/sevice";
import { ProductMainList } from "@/api/types";

const styles = stylex.create({
  home: {
    width: "100%",
    maxWidth: "1050",
    "::-webkit-scrollbar": {
      width: "5px",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#888",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
  },
  imageContainer: {
    width: "97vw",
    height: {
      default: "85vh",
      "@media (max-width: 500px)": "50vh",
    },
    position: "relative",
    borderRadius: "3px",
  },
  sectionContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

const stt = {
  WebkitUserDrag: "none",
  borderRadius: "3px",
  "object-fit": "cover"
};

export default async function Page() {
  const mainData: ProductMainList[] = await apiCall("get", "PRODUCT_MAINLIST");
  return (
    <div {...stylex.props(styles.home)}>
      <div {...stylex.props(styles.imageContainer)}>
        <Image
          src={homePage}
          alt="Picture of the author"
          placeholder="blur"
          fill
          style={stt}
        />
      </div>

      <div {...stylex.props(styles.sectionContainer)}>
        <Suspense fallback={<div>Loading</div>}>
          <Sections mainData={mainData} />
        </Suspense>
      </div>
    </div>
  );
}
