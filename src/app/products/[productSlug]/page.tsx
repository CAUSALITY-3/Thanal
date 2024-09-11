import { ImageSlider } from "@Components/ImageSlider/ImageSlider";
import { Ratings } from "@Components/Ratings/Ratings";
import { ProductFeatures } from "@Components/ProductFeatures/ProductFeatures";
import { BuyOrAdd } from "@Components/BuyOrAdd/BuyOrAdd";
import { apiCall } from "@/api/sevice";
import "./productSlug.scss";

export default async function ProductDetail({ params }: any) {
  const product = await apiCall(
    "get",
    "GET_PRODUCT_BY_ID",
    {},
    `?id=${params.productSlug}`
  );
  // const path = `?path=products/${product.category}/${product.name}`;
  // const imageFiles = await apiCall("get", "GET_IMAGES", {}, path);
  // const images = imageFiles.map((file: string) => {
  //   return `${process.env.API_BASE_URL}images/getImage${path}/${file}`;
  // });
  const routeLinkText = `Products > ${product.category} > ${product.name}`;

  return (
    <div className="productDetailOuter">
      <div className="productDetail">
        <div className="routeLink">{routeLinkText}</div>
        <div className="productDetailContainer">
          <div className="productImageSection">
            <div className="imageSliderContainerStyles">
              <ImageSlider slides={product.images} />
            </div>

            <div className="buyOrAdd">
              <BuyOrAdd productId={params.productSlug} />
            </div>
          </div>
          <div className="productDetails">
            <div className="productName">{product.name}</div>
            <Ratings
              ratings={product.ratings}
              size="m"
              reviewCount={product?.reviews?.length}
            />
            <div className="featureContainer">
              <ProductFeatures features={product.features} />
            </div>
            <div className="descriptionContainer">
              <div className="descriptionTitle">Description</div>
              <div className="description">{product.description}</div>
            </div>
            <div style={{ marginBottom: "40px" }}>
              Available Quantity: {product.stock}
            </div>
          </div>
          <div className="buyOrAddMobile">
            <div className="buyOrAddMobileOuter">
              <BuyOrAdd productId={params.productSlug} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
