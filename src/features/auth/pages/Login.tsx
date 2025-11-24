import { Form, Input } from "antd";
import { useNavigate } from "react-router";
import type { LoginParams } from "../model/auth.types.ts";
import LoginButton from "../ui/LoginButton.tsx";
import { useLoginMutation } from "../model/auth.mutations.ts";
import { useGetUserQuery } from "../model/auth.queries.ts";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const styles = {
  section: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
  },
};

const Login = () => {
  const loginMutation = useLoginMutation();
  const userQuery = useGetUserQuery();
  const onFinish = async (values: LoginParams) => {
    await loginMutation.mutateAsync(values);

    const userRes = await userQuery.refetch();
    if (userRes) {
      navigate("/");
    }
  };
  const navigate = useNavigate();
  return (
    <section style={styles.section}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <div style={styles.button}>
            <LoginButton htmlType="submit"> Отправить </LoginButton>
            <LoginButton onClick={() => navigate("/")}> Назад </LoginButton>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Login;
