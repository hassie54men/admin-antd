import { Typography } from "antd";
import { useLocation, useNavigate } from "react-router";

interface TableLinkProps {
  id: string | number;
}

export const TableLink = (props: TableLinkProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <Typography.Link onClick={() => navigate(`${pathname}/${props.id}`)}>
      {props.id}
    </Typography.Link>
  );
};
