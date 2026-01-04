import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useCreateUser } from "../model/user.mutations.ts";
import {
  App,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import type { UserRequest } from "../model/user.types.ts";
import { ENDPOINTS } from "../../../api/endpoints.ts";

const UserForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { notification } = App.useApp();
  const navigate = useNavigate();
  const { mutate: createUser, isPending } = useCreateUser();

  const onFinish = async (values: UserRequest) => {
    createUser(values, {
      onSuccess: () => {
        form.resetFields();
        notification.success({
          message: "Успешно",
          description: "Сущность успешно создана",
        });
        navigate(ENDPOINTS.users.list);
      },
      onError: () => {
        notification.error({
          message: "Ошибка",
          description: "Ошибка при создании сущности",
        });
      },
    });
  };

  return (
    <>
      <Card>
        <Form
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: "100%" }}
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
              <Form.Item<UserRequest>
                label={t("users.firstName")}
                name="firstName"
                rules={[{ required: true, message: t("validations.required") }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item<UserRequest>
                label={t("users.lastName")}
                name="lastName"
                rules={[{ required: true, message: t("validations.required") }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item<UserRequest>
                label={t("users.age")}
                name="age"
                rules={[
                  {
                    required: true,
                    message: t("validations.required"),
                  },
                  {
                    type: "number",
                    min: 18,
                    max: 100,
                    message:
                      t("validations.ageRange") ||
                      "Возраст должен быть от 18 до 100 лет",
                  },
                ]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={6}>
              <Form.Item<UserRequest>
                label={t("users.gender")}
                name="gender"
                rules={[
                  {
                    required: true,
                    message: t("validations.required"),
                  },
                ]}
              >
                <Select>
                  <Select.Option value={"male"}>
                    {t("validations.male")}
                  </Select.Option>
                  <Select.Option value={"female"}>
                    {t("validations.female")}
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Form.Item<UserRequest>
                label={t("users.email")}
                name="email"
                rules={[
                  { required: true, message: t("validations.required") },
                  { type: "email", message: t("validations.emailFormat") },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item style={{ marginTop: 32, textAlign: "right" }}>
            <Button type="primary" htmlType="submit" loading={isPending}>
              {t("users.save")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default UserForm;
