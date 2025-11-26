import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import type { LoginParams } from "../model/auth.types.ts";
import { useLoginMutation } from "../model/auth.mutations.ts";

type FieldType = {
  username?: string;
  password: string;
  remember: string;
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
  const { mutate: loginMutation, isPending } = useLoginMutation();
  const onFinish = async (values: LoginParams) => {
    loginMutation(values);
  };
  const navigate = useNavigate();
  return (
    <section style={styles.section}>
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
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
            <Button htmlType="submit" loading={isPending}>
              Отправить
            </Button>
            <Button onClick={() => navigate("/")}> Назад </Button>
          </div>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Login;
