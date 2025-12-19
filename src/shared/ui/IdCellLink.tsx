import { useNavigate } from "react-router";
import { Resources } from "../types/api.ts";
import type { Product } from "../../features/products/model/product.types.ts";

interface Props {
  text: number | string;
  record: Product;
  recourses: Resources;
}

const IdCellLink = ({ text, record, recourses }: Props) => {
  const navigate = useNavigate();
  return (
    <a onClick={() => navigate(`/${recourses}/show/${record.id}`)}>{text}</a>
  );
};

export default IdCellLink;
