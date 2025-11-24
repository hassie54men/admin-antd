import { Form, Input } from "antd";
import { useNavigate } from "react-router";
import { getUser, login } from "../model/auth.api.ts";
import type { LoginParams } from "../model/auth.types.ts";
import LoginButton from "../ui/LoginButton.tsx";

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
  const onFinish = async (values: LoginParams) => {
    await login(values);
    console.log(values);

    const user = await getUser();
    if (user) {
      navigate("/user");
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
