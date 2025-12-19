import { Typography } from "antd";
import type { Product } from "../model/product.types";
import { useTranslation } from "react-i18next";
import IdCellLink from "../../../shared/ui/IdCellLink.tsx";
import { Resources } from "../../../shared/types/api.ts";

export const useProductColumns = () => {
  const { t } = useTranslation();

  const columns = [
    {
      title: t("products.id"),
      dataIndex: "id",
      key: "id",
      render: (text: number, record: Product) => (
        <IdCellLink
          text={text}
          record={record}
          recourses={Resources.PRODUCTS}
        />
      ),
    },
    {
      title: t("products.title"),
      dataIndex: "title",
      key: "title",
      render: (text: string) => (
        <Typography.Text copyable>{text}</Typography.Text>
      ),
    },
    {
      title: t("products.category"),
      dataIndex: "category",
      key: "category",
    },
    {
      title: t("products.price"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: t("products.rating"),
      dataIndex: "rating",
      key: "rating",
    },
  ];

  return { columns };
};
