import { apiCall } from "@/api/sevice";
import * as stylex from "@stylexjs/stylex";
import { ProductCard } from "@/Components/ProductCard/ProductCard";

const styles = stylex.create({
  prouctItemContainer: {
    width: {
      default: "90vw",
      "@media (max-width: 500px)": "auto",
    },

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    overflowY: "auto",
    "::-webkit-scrollbar": {
      width: 0,
      background: "transparent",
    },
  },
});

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
      category: item.category
    };
  });

  return (
    <div {...stylex.props(styles.prouctItemContainer)}>
      {formattedData.map((product: any, key:any) => (
        <ProductCard key={key} props={product} type={product.category} />
      ))}
    </div>
  );
}
