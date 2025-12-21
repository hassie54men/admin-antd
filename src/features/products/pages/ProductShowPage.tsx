import ProductCard from "../ui/ProductCard.tsx";
import ShowPageWrapper from "../../../shared/ui/ShowPageWrapper.tsx";
import { useDeleteProduct } from "../model/products.mutations.ts";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { Resources } from "../../../shared/types/api.ts";

const ProductShowPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const productId = id ?? "";
  const { mutate: deleteProductMutate, isPending: deletePending } =
    useDeleteProduct();
  return (
    <ShowPageWrapper
      title={t("products.product")}
      breadcrumbs={[
        { title: t("products.products") },
        { title: t("products.product") },
      ]}
      onDelete={deleteProductMutate}
      resource={Resources.PRODUCTS}
      id={productId}
      deletePending={deletePending}
      deleteLabel={t("text.delete")}
    >
      <ProductCard />;
    </ShowPageWrapper>
  );
};

export default ProductShowPage;
