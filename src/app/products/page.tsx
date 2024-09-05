import { apiCall } from "@/api/sevice";
import { ProductMainList } from "@/api/types";
import Link from "next/link";
import "./product.scss";

export default async function Products() {
  const mainData: ProductMainList[] = await apiCall("get", "PRODUCT_MAINLIST");

  return (
    <div className="productContainer">
      {mainData.map((item: ProductMainList, key: any) => (
        <div className="productTypeBox" key={key}>
          <img
            className="imageStyle"
            src={`${
              process.env.IMAGE_URL
            }${item.type.toLowerCase()}/${item.type.toLowerCase()}.jpg`}
            alt="Picture of the author"
          />
          <div className="prouctAbsoluteContainer">
            <div className="productTypeNameConainer">
              <p className="productTypeName">{item.type}</p>
            </div>
            <div className="prouctItemContainerOuter">
              <div className="prouctItemContainer">
                {Object.values(item.data).map((card, key: any) => (
                  <Link
                    href={`/products/family/${card.name}`}
                    style={{ textDecoration: "none" }}
                    className="productBox"
                    key={key}
                    prefetch={false}
                  >
                    <div className="product-imageContainer">
                      <img
                        src={`${process.env.IMAGE_URL}${item.type}/${card.name}/1.jpg`}
                        alt="Picture of the author"
                      />
                    </div>

                    <div className="productNameContainer">
                      <p className="productName">{card.name}</p>
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
