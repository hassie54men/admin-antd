import ProductForm from "../ui/ProductForm.tsx";
import CreatePageWrapper from "../../../shared/ui/CreatePageWrapper.tsx";
import { useTranslation } from "react-i18next";

const ProductCreatePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <CreatePageWrapper
        title={t("products.create")}
        breadcrumbs={[
          { title: t("products.products") },
          { title: t("products.product") },
          { title: t("products.create") },
        ]}
      >
        <ProductForm />
      </CreatePageWrapper>
    </>
  );
};

export default ProductCreatePage;
