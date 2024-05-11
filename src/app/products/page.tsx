import { apiCall } from "@/api/sevice";
import { ProductMainList } from "@/api/types";
import * as stylex from "@stylexjs/stylex";
import { text } from "../globalTokens.stylex";
import Image from "next/image";
import Link from "next/link";

const styles = stylex.create({
  productContainer: {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#e1f4e1",
  },
  productTypeBox: {
    margin: "10px 0",
    height: "60vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
  },
  prouctTitle: {
    fontWeight: 600,
    fontSize: text.sm,
    "::first-letter": {
      "text-transform": "uppercase",
    },
  },
  prouctAbsoluteContainer: {
    height: "60vh",
    width: "100vw",
    position: "absolute",
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    background:
      "radial-gradient(circle at center, transparent, rgba(0,0,0,.7))",
  },
  productTypeNameConainer: {
    width: "90vw",
  },
  productTypeName: {
    color: "white",
    fontWeight: 600,
    fontSize: text.h4,
    "::first-letter": {
      "text-transform": "uppercase",
    },
  },

  prouctItemContainer: {
    height: {
      default: "40vh",
      "@media (max-width: 500px)": "35vh",
    },
    width: {
      default: "90vw",
      "@media (max-width: 500px)": "auto",
    },

    display: {
      default: "flex",
      "@media (max-width: 500px)": "block",
    },
    alignItems: "center",
    justifyContent: "center",
    flexWrap: {
      default: "wrap",
      "@media (max-width: 500px)": "nowrap",
    },
    flexDirection: {
      default: "row",
      "@media (max-width: 500px)": "column",
    },
    overflowY: "auto",
    "::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  },
  prouctItemContainerOuter: {
    ":hover": {
      opacity: 1,
      transition: "all ease 0.5s",
    },
    ":active": {
      opacity: 1,
      transition: "all ease 0.5s",
    },
    opacity: {
      default: 0,
      "@media (max-width: 500px)": 1,
    },
    padding: {
      default: "10px",
      "@media (max-width: 500px)": "20px",
    },
    "backdrop-filter": "blur(10px)",
    backgroundColor: "rgb(0,0,0,.3)",
    transition: "all ease 0.5s",
    borderRadius: 5,
  },
  productBox: {
    height: 200,
    width: 200,
    margin: 5,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    ":hover": {
      cursor: "pointer",
      "box-shadow": "5px 5px 10px 2px rgb(41, 41, 41, .3)",
    },
    ":active": {
      cursor: "pointer",
      "box-shadow": "5px 5px 10px 2px rgb(41, 41, 41, .3)",
    },
  },
  imageContainer: {
    height: "200px",
    width: "200px",
    position: "relative",
    borderRadius: "5px",
  },
  productNameContainer: {
    height: 200,
    width: 200,
    opacity: {
      default: 0,
      "@media (max-width: 500px)": 1,
    },
    borderRadius: 5,
    position: "absolute",
    transition: "all ease 0.5s",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    background: "radial-gradient(ellipse at bottom, #00000078, transparent)",
    ":hover": {
      cursor: "pointer",
      opacity: 1,
      transition: "all ease 0.5s",
    },
    ":active": {
      cursor: "pointer",
      opacity: 1,
      transition: "all ease 0.5s",
    },
  },
  productName: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "white",
    fontWeight: 600,
    fontSize: text.p,
    "::first-letter": {
      "text-transform": "uppercase",
    },
  },
});

const imageStyle = {
  height: "60vh",
  width: "100vw",
  "object-fit": "cover",
};

const boxImageStyle = {
  height: 200,
  width: 200,
  "object-fit": "cover",
};

const stt = {
  WebkitUserDrag: "none",
  borderRadius: "5px",
  "object-fit": "cover",
};

export default async function Products() {
  const mainData: ProductMainList[] = await apiCall("get", "PRODUCT_MAINLIST");

  return (
    <div {...stylex.props(styles.productContainer)}>
      {mainData.map((item: ProductMainList, key: any) => (
        <div {...stylex.props(styles.productTypeBox)} key={key}>
          <Image
            src={`http://localhost:5000/images/getImage?path=products/${item.type}/${item.type}.jpg`}
            alt="Picture of the author"
            style={imageStyle}
          />
          <div {...stylex.props(styles.prouctAbsoluteContainer)}>
            <div {...stylex.props(styles.productTypeNameConainer)}>
              <p {...stylex.props(styles.productTypeName)}>{item.type}</p>
            </div>
            <div {...stylex.props(styles.prouctItemContainerOuter)}>
              <div {...stylex.props(styles.prouctItemContainer)}>
                {Object.values(item.data).map((card, key: any) => (
                  <Link href={`/products/family/${card.name}`} style={{ textDecoration: "none" }} {...stylex.props(styles.productBox)} key={key}>
                    <div {...stylex.props(styles.imageContainer)}>
                      <Image
                        src={`http://localhost:5000/images/getImage?path=products/${item.type}/${card.name}/1.jpg`}
                        alt="Picture of the author"
                        placeholder="blur"
                        fill
                        style={stt}
                      />
                    </div>

                    <div {...stylex.props(styles.productNameContainer)}>
                      <p {...stylex.props(styles.productName)}>{card.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
