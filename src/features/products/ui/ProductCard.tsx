import { useGetSingleProduct } from "../model/product.queries.ts";
import { useParams } from "react-router";
import { Card } from "antd";
import { useTranslation } from "react-i18next";
import BackButton from "../../../shared/ui/BackButton.tsx";
const styles = {
  PRODUCT_CARD_WIDTH: {
    width: "300px",
  },
};

const ProductCard = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const productId = Number(id);
  const { data, isLoading, isError } = useGetSingleProduct(productId);

  if (!data && isError) {
    return <div>PRODUCT LOADING ERROR</div>;
  }

  return (
    <>
      <Card
        title={t("products.productCard")}
        style={styles.PRODUCT_CARD_WIDTH}
        loading={isLoading}
      >
        <p>
          {t("products.id")}: {data?.id}
        </p>
        <p>
          {t("products.title")}: {data?.title}
        </p>
        <p>
          {t("products.category")}: {data?.category}
        </p>
        <p>
          {t("products.price")}: {data?.price}
        </p>
        <p>
          {t("products.rating")}: {data?.rating}
        </p>
      </Card>
      <BackButton />
    </>
  );
};

export default ProductCard;
