import ProductForm from "../ui/ProductForm.tsx";
import ProductCreatePageWrapper from "./ProductCreatePageWrapper.tsx";

const ProductCreatePage = () => {
  return (
    <>
      <ProductCreatePageWrapper>
        <ProductForm />
      </ProductCreatePageWrapper>
    </>
  );
};

export default ProductCreatePage;
