import { Button, type ButtonProps } from "antd";
import type { ReactNode } from "react";

interface LoginButtonProps extends ButtonProps {
  children: ReactNode;
}

const LoginButton = ({ children, onClick, ...rest }: LoginButtonProps) => {
  return (
    <Button type="primary" htmlType="submit" onClick={onClick} {...rest}>
      {children}
    </Button>
  );
};

export default LoginButton;
