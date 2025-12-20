import ProductUpdateForm from "../ui/ProductUpdateForm.tsx";
import EditPageWrapper from "../../../shared/ui/EditPageWrapper.tsx";
import { useTranslation } from "react-i18next";

const ProductsEditPage = () => {
  const { t } = useTranslation();
  return (
    <EditPageWrapper
      title={t("products.product")}
      breadcrumbs={[
        { title: t("products.products") },
        { title: t("products.product") },
        { title: t("products.edit") },
      ]}
    >
      <ProductUpdateForm />;
    </EditPageWrapper>
  );
};

export default ProductsEditPage;
