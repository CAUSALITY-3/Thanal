import "./Home.scss";
import * as stylex from "@stylexjs/stylex";
import { Suspense } from "react";
import { Sections } from "./Sections";
import Image from "next/image";
import homePage from "@public/homePage.jpg";
import { dbCall } from "@/api/sevice";
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
  sectionContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

export default async function Page() {
  const mainData: ProductMainList[] = await dbCall('get', 'PRODUCT_MAINLIST');
  return (
    <div {...stylex.props(styles.home)}>
      <Image
        src={homePage}
        alt="Picture of the author"
        style={{
          width: "100%",
          maxWidth: "1080",
        }}
      />
      <div {...stylex.props(styles.sectionContainer)}>
        <Suspense fallback={<div>Loading</div>}>
          <Sections mainData={mainData}/>
        </Suspense>
      </div>
    </div>
  );
}
