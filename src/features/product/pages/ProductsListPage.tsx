import { Col, Row } from "antd";
import ProductsTable from "../ui/ProductsTable.tsx";

const ProductsListPage = () => {
  return (
    <Row>
      <Col md={{ span: 12, offset: 6 }}>
        <ProductsTable />
      </Col>
    </Row>
  );
};

export default ProductsListPage;
