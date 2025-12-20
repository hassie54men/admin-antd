import { useNavigate } from "react-router";
import { Resources } from "../types/api.ts";
import { Typography } from "antd";

interface recordId {
  id: string | number;
}

interface Props<T extends recordId> {
  text: number | string;
  record: T;
  recourse: Resources;
}

const IdCellLinkProps = <T extends recordId>({
  text,
  record,
  recourse,
}: Props<T>) => {
  const navigate = useNavigate();
  return (
    <Typography.Link onClick={() => navigate(`/${recourse}/show/${record.id}`)}>
      {text}
    </Typography.Link>
  );
};

export default IdCellLinkProps;
