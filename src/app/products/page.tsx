import { apiCall } from "@/api/sevice";
import { ProductMainList } from "@/api/types";
import Link from "next/link";
import "./product.scss";
import { ProductItems } from "@/Components/ProductItemsComponent/ProductItems";

export default async function Products() {
  const mainData: ProductMainList[] = await apiCall("get", "PRODUCT_MAINLIST");

  return (
    <div className="productContainer">
      {mainData.map((item: ProductMainList, key: any) => (
        <div className="productTypeBox" key={key}>
          {/* <img
            className="imageStyle"
            loading="lazy"
            src={`${
              process.env.IMAGE_URL
            }${item.type.toLowerCase()}/${item.type.toLowerCase()}.webp`}
            alt="Picture of the author"
          /> */}
          <div
            className="productAbsoluteContainer"
            style={{
              backgroundImage: `radial-gradient(circle at center,
                transparent,
                rgba(0, 0, 0, 0.7)), url(${
                  process.env.IMAGE_URL
                }${item.type.toLowerCase()}/${item.type.toLowerCase()}.webp)`,
              // `url(${
              //   process.env.IMAGE_URL
              // }${item.type.toLowerCase()}/${item.type.toLowerCase()}.webp)`,
              // background: radial-gradient(
              //   circle at center,
              //   transparent,
              //   rgba(0, 0, 0, 0.7)
              // )
            }}
          >
            <div className="productTypeNameConainer">
              <div className="productTypeName">{item.type}</div>
            </div>
            <ProductItems>
              <div className="productItemContainerOuter">
                <div className="productItemContainer">
                  {Object.entries(item.data).map(([family, card], key: any) => (
                    <Link
                      href={`/products/family/${family}`}
                      style={{ textDecoration: "none" }}
                      className="productBox"
                      key={key}
                      prefetch={false}
                    >
                      <div className="product-imageContainer">
                        <img
                          loading="lazy"
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
            </ProductItems>
          </div>
        </div>
      ))}
    </div>
  );
}
