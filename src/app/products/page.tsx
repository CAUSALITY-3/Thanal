import { dbCall } from "@/api/sevice";
import { ProductMainList } from "@/api/types";
import * as stylex from "@stylexjs/stylex";
import { text } from "../globalTokens.stylex";


const styles = stylex.create({
  productContainer: {
    margin: "20px",
    minHeight: "100vh",
    width: "90vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "aqua"
  },
  productTypeBox: {
    maxHeight: "100px",
    maxWidth: "120px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:"green",
    overflow: "hidden",
    ":hover":{
      maxHeight: "auto"
    }
  },
  prouctTypeTitle: {
    fontWeight: 600,
    fontSize: text.p,
    "::first-letter": {
      "text-transform": "uppercase",
    },
  },
  prouctContainer: {
    paddingLeft: "10px"
  },
  prouctTitle: {
    fontWeight: 600,
    fontSize: text.sm,
    "::first-letter": {
      "text-transform": "uppercase",
    },
  },
  prouctBox: {
    marginTop: "10px"
  }
});

export default async function Products() {
  const mainData: ProductMainList[] = await dbCall("get", "PRODUCT_MAINLIST");

  return (
    <div {...stylex.props(styles.productContainer)}>
      {mainData.map((item: ProductMainList, key: any) => (
        <div className="productTypeBox" {...stylex.props(styles.productTypeBox)} key={key}>
          <p {...stylex.props(styles.prouctTypeTitle)}>{item.type}</p>
          <div {...stylex.props(styles.prouctBox)} >
          {Object.values(item.data).map((card, key) => (
                  <p {...stylex.props(styles.prouctTitle)} key={key}>{card.name}</p>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
