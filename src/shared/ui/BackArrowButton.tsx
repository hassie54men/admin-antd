import { Button, type ButtonProps } from "antd";
import { useNavigate } from "react-router";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackArrowButton = (props: ButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      type="text"
      onClick={() => navigate(-1)}
      icon={<ArrowLeftOutlined style={{ color: "black", fontSize: 18 }} />}
      style={{
        padding: 0,
        width: 32,
        height: 32,
      }}
      {...props}
    />
  );
};

export default BackArrowButton;
