import { FC } from "react";
import * as stylex from "@stylexjs/stylex";
import { ImageSlider } from "@Components/ImageSlider/ImageSlider";
import { Ratings } from "@Components/Ratings/Ratings";
import { ProductFeatures } from "@Components/ProductFeatures/ProductFeatures";
import { BuyOrAdd } from "@Components/BuyOrAdd/BuyOrAdd";
import { dbCall } from "@/api/sevice";

const styles = stylex.create({
  productDetailOuter: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  productDetail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "95vw",
    maxWidth: "1444px",
  },
  routeLink: {
    margin: "10px 0",
    padding: "0 0 0 10px",
    color: "rgb(88, 88, 88)",
    width: "100%",
  },
  productDetailContainer: {
    borderRadius: "5px",
    width: "100%",
    height: "auto",
    background: "#e1f4e1",
    display: "flex",
    justifyContent: {
      default: "space-around",
      "@media (max-width: 500px)": "center",
    },
    flexDirection: {
      default: "row",
      "@media (max-width: 500px)": "column",
    },
  },
  productImage: {
    width: "100%",
    margin: "0 5px",
    display: {
      default: "visible",
      "@media (max-width: 500px)": "flex",
    },
  },
  productImageTag: {
    width: "100%",
    "-webkit-user-drag": "none",
  },
  productDetails: {
    width: {
      default: "40vw",
      "@media (max-width: 500px)": "auto",
    },
  },
  carouselWrap: {
    width: "98%",
    display: "flex",
    justifyContent: "space-around",
  },
  imagesdiv: {
    display: "flex",
  },
  imageWrap: {
    display: "flex",
    "scroll-snap-type": "x mandatory",
  },
  image: {
    width: "95vw",
    height: "300px",
    borderRadius: "5px",
    margin: "10px 5px",
    "scroll-snap-align": "center",
    "-webkit-user-drag": "none",
  },
  productImageSection: {
    margin: {
      default: "10px 0 0 0",
      "@media (max-width: 500px)": "0",
    },
    position: {
      default: "sticky",
      "@media (max-width: 500px)": "relative",
    },
    top: {
      default: "5px",
      "@media (max-width: 500px)": "0",
    },
  },
  imageSliderContainerStyles: {
    height: {
      default: "45vw",
      "@media (max-width: 500px)": "60vh",
    },
    width: {
      default: "45vw",
      "@media (max-width: 500px)": "auto",
    },
    maxHeight: {
      default: "60vh",
      "@media (max-width: 500px)": "auto",
    },
  },
  productName: {
    color: "#232323",
    fontSize: "x-large",
    fontWeight: "bolder",
    margin: "10px 0",
  },
  featureContainer: {
    margin: "30px 0",
  },
  descriptionContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 0",
    paddingRight: "10px",
  },
  descriptionTitle: {
    fontWeight: "bold",
    marginBottom: "5px",
  },
  description: {
    display: "-webkit-box",
    "-webkit-line-clamp": "2",
    "-webkit-box-orient": "vertical",
    overflow: "hidden",
    "text-align": "justify",
    ":hover": {
      display: "flex",
      color: "rgba(0,0,0,0.8)",
    },
  },
  buyOrAddMobile: {
    position: "sticky",
    bottom: "0px",
    left: "0px",
    height: "auto",
    width: "95vw",
    justifyContent: "center",
    alignItems: "center",
    padding: "5px 0",
    background: "white",
    display: {
      default: "none",
      "@media (max-width: 500px)": "flex",
    },
  },
  buyOrAdd: {
    margin: "20px 0",
    display: {
      default: "visible",
      "@media (max-width: 500px)": "none",
    },
  },
  buyOrAddMobileOuter: {
    width: "100%",
    height: "auto",
  },
});

export default async function ProductDetail({ params }: any) {

  const product = await dbCall('get', 'GET_PRODUCT_BY_ID', `?id=${params.productSlug}`);
  console.log("qwerty",JSON.stringify(params))
  // const resp = await fetch(`${process.env.API_BASE_URL}products/product${params.productSlug}`);
  // const product = await resp.json();
  const routeLinkText = `Products > ${product.category} > ${product.name}`;
  const images = [product.image, product.image, ...product.images];

  return (
    <div {...stylex.props(styles.productDetailOuter)}>
      <div {...stylex.props(styles.productDetail)}>
        <div {...stylex.props(styles.routeLink)}>{routeLinkText}</div>
        <div {...stylex.props(styles.productDetailContainer)}>
          <div {...stylex.props(styles.productImageSection)}>
            <div {...stylex.props(styles.imageSliderContainerStyles)}>
              <ImageSlider slides={images} />
            </div>

            <div {...stylex.props(styles.buyOrAdd)}>
              <BuyOrAdd />
            </div>
          </div>
          <div {...stylex.props(styles.productDetails)}>
            <div {...stylex.props(styles.productName)}>{product.name}</div>
            <Ratings
              ratings={product.ratings}
              size="m"
              reviewCount={product?.reviews?.length}
            />
            <div {...stylex.props(styles.featureContainer)}>
              <ProductFeatures features={product.features} />
            </div>
            <div {...stylex.props(styles.descriptionContainer)}>
              <div {...stylex.props(styles.descriptionTitle)}>Description</div>
              <div {...stylex.props(styles.description)}>
                {product.description}
              </div>
            </div>
            <div style={{ marginBottom: "40px" }}>
              Available Quantity: {product.stock}
            </div>
            
          </div>
          <div {...stylex.props(styles.buyOrAddMobile)}>
              <div {...stylex.props(styles.buyOrAddMobileOuter)}>
                <BuyOrAdd />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
