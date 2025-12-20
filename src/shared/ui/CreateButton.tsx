import { Button } from "antd";
import { useNavigate } from "react-router";

interface Props {
  to: string;
  label: string;
}

const CreateButton = ({ to, label }: Props) => {
  const navigate = useNavigate();
  return (
    <Button type="primary" onClick={() => navigate(to)}>
      {label}
    </Button>
  );
};

export default CreateButton;
