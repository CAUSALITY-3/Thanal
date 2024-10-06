import { ImageSlider } from "@Components/ImageSlider/ImageSlider";
import { Ratings } from "@Components/Ratings/Ratings";
import { ProductFeatures } from "@Components/ProductFeatures/ProductFeatures";
import { BuyOrAdd } from "@Components/BuyOrAdd/BuyOrAdd";
import { apiCall } from "@/api/sevice";
import "./productSlug.scss";
import Link from "next/link";

export default async function ProductDetail({ params }: any) {
  const product = await apiCall(
    "get",
    "GET_PRODUCT_BY_ID",
    {},
    `?id=${params.productSlug}`
  );
  const routeLinkText = `Products > ${product.category} > ${product.name}`;

  return (
    <div className="productDetailOuter">
      <div className="productDetail">
        <div className="routeLink">
          <Link className="routeLinkItem" prefetch={false} href="/products">
            Products /{" "}
          </Link>
          <Link className="routeLinkItem" prefetch={false} href={`/products`}>
            {product.category} /{" "}
          </Link>
          <Link
            className="routeLinkItem"
            prefetch={false}
            href={`/products/family/${product.family}`}
          >
            {product.name}
          </Link>
        </div>
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
              size="s"
              reviewCount={product?.reviews?.length}
            />
            <div className="description">{product.description}</div>
            <div className="featureContainer">
              <ProductFeatures features={product.features} />
            </div>

            <div style={{ marginBottom: "40px" }} className="stock">
              Available Quantity: {product.stock}
            </div>
            <div className="productPrice">₹ {product.price}</div>
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
