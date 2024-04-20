import "./Home.scss";
import * as stylex from "@stylexjs/stylex";
import { Suspense } from "react";
import { Sections } from "./Sections";
import Image from "next/image";
import homePage from "@public/homePage.jpg";
import { dbCall } from "@/api/sevice";

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

interface ProductMainList {
  type: string;
  data: {
    [key: string]: {
      category: string;
      name: string;
      description: string;
      image: string;
      price: number;
      productId: string;
      ratings: { average: number; count: number };
    };
  };
}

// async function getMainData (){
//   const mainListService: ProductServices = await getservice("productService");
//   const mainData: ProductMainList[] = await mainListService.getProductMainList();
//   return mainData
// }

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
