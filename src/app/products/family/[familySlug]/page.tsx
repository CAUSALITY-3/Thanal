import { apiCall } from "@/api/sevice";
import { ProductCard } from "@/Components/ProductCard/ProductCard";
import "./family.scss";

export default async function ProductFamily({ params }: any) {
  const familyData: any = await apiCall(
    "get",
    "PRODUCT_FAMILY",
    {},
    `?family=${params.familySlug}`
  );
  const formattedData = familyData.map((item: any) => {
    return {
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      productId: item.productId,
      ratings: item.ratings,
      category: item.category,
    };
  });

  return (
    <div className="prouctItemContainer">
      {formattedData.map((product: any, key: any) => (
        <ProductCard key={key} props={product} type={product.category} />
      ))}
    </div>
  );
}
