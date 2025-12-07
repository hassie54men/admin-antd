import { useGetSingleProduct } from "../model/product.queries.ts";
import { useNavigate, useParams } from "react-router";
import { Button, Card } from "antd";
import { useTranslation } from "react-i18next";
import { ROUTES } from "../../../shared/constants/routes.ts";

const ProductCard = () => {
  const navigate = useNavigate();
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
        title={t("table.productCard")}
        style={{ width: 300 }}
        loading={isLoading}
      >
        <p>
          {t("table.id")}: {data?.id}
        </p>
        <p>
          {t("table.title")}: {data?.title}
        </p>
        <p>
          {t("table.category")}: {data?.category}
        </p>
        <p>
          {t("table.price")}: {data?.price}
        </p>
        <p>
          {t("table.rating")}: {data?.rating}
        </p>
      </Card>
      <Button onClick={() => navigate(ROUTES.products)}>
        {t("table.backButton")}
      </Button>
    </>
  );
};

export default ProductCard;
