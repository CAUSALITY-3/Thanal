"use client";
import { ImageSlider } from "@Components/ImageSlider/ImageSlider";
import { Ratings } from "@Components/Ratings/Ratings";
import { ProductFeatures } from "@Components/ProductFeatures/ProductFeatures";
import { BuyOrAdd } from "@Components/BuyOrAdd/BuyOrAdd";
import { apiCall } from "@/api/sevice";
import "./productSlug.scss";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function ProductDetail({ params }: any) {
  const getProductById = async () => {
    const data = await apiCall(
      "get",
      "GET_PRODUCT_BY_ID",
      {},
      `?id=${params.productSlug}`
    );
    console.log("GET_PRODUCT_BY_ID", data);

    return data;
  };

  const productResp = useQuery({
    queryFn: getProductById,
    queryKey: [params.productSlug],
    staleTime: 3600000,
  });

  return (
    !productResp.isLoading && (
      <div className="productDetailOuter">
        <div className="productDetail">
          <div className="routeLink">
            <Link className="routeLinkItem" prefetch={false} href="/products">
              Products /{" "}
            </Link>
            <Link className="routeLinkItem" prefetch={false} href={`/products`}>
              {productResp.data.category} /{" "}
            </Link>
            <Link
              className="routeLinkItem"
              prefetch={false}
              href={`/products/family/${productResp.data.family}`}
            >
              {productResp.data.name}
            </Link>
          </div>
          <div className="productDetailContainer">
            <div className="productImageSection">
              <div className="imageSliderContainerStyles">
                <ImageSlider slides={productResp.data.images} />
              </div>

              <div className="buyOrAdd">
                <BuyOrAdd productId={params.productSlug} />
              </div>
            </div>
            <div className="productDetails">
              <div className="productName">{productResp.data.name}</div>
              <Ratings
                ratings={productResp.data.ratings}
                size="s"
                reviewCount={productResp.data?.reviews?.length}
              />
              <div className="description">{productResp.data.description}</div>
              <div className="featureContainer">
                <ProductFeatures features={productResp.data.features} />
              </div>

              <div style={{ marginBottom: "40px" }} className="stock">
                Available Quantity: {productResp.data.stock}
              </div>
              <div className="productPrice">₹ {productResp.data.price}</div>
            </div>
            <div className="buyOrAddMobile">
              <div className="buyOrAddMobileOuter">
                <BuyOrAdd productId={params.productSlug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
