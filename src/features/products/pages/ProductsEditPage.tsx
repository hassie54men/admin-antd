import ProductUpdateForm from "../ui/ProductUpdateForm.tsx";
import ProductEditPageWrapper from "./ProductEditPageWrapper.tsx";

const ProductsEditPage = () => {
  return (
    <ProductEditPageWrapper>
      <ProductUpdateForm />;
    </ProductEditPageWrapper>
  );
};

export default ProductsEditPage;
