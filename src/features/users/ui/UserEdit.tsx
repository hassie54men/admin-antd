import { Button, Card, Flex, Form, Input, InputNumber, Select } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router";
import { useEditUser } from "../model/user.mutations.ts";
import { useGetUser } from "../model/user.queries.ts";
import type { UserFormData } from "../model/user.types.ts";
import { ADMIN_ROUTES } from "../../../shared/constants/routes.ts";
import { useEffect } from "react";
import { initFormUserMapper } from "../model/mappers/initForm.ts";

const UserEdit = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { id } = useParams();
  const userId = id ?? "";
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetUser(userId);
  const { mutate: editUser, isPending } = useEditUser();

  const handleFinish = async (user: UserFormData) => {
    editUser(
      {
        user: user,
        id: userId,
      },
      { onSuccess: () => navigate(`${ADMIN_ROUTES.USERS}/show/${userId}`) },
    );
  };

  useEffect(() => {
    if (data) {
      const mappedData = initFormUserMapper(data);
      if (mappedData) {
        form.setFieldsValue(mappedData);
      }
    }
  }, [data, form]);

  if (!data && isError) {
    return <div>PRODUCT LOADING ERROR</div>;
  }

  return (
    <>
      <Card loading={isLoading}>
        <Form layout="vertical" onFinish={handleFinish} form={form}>
          <Flex gap={16} wrap>
            <Form.Item label={t("users.id")} style={{ flex: 1, minWidth: 200 }}>
              <Input value={data?.id} disabled />
            </Form.Item>
            <Form.Item
              label={t("users.firstName")}
              name={"firstName"}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("users.lastName")}
              name={"lastName"}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("users.age")}
              name={"age"}
              style={{ flex: 1, minWidth: 200 }}
              rules={[
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
            <Form.Item
              label={t("users.gender")}
              name={"gender"}
              style={{ flex: 1, minWidth: 200 }}
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
            <Form.Item
              label={t("users.email")}
              name={"email"}
              rules={[{ type: "email", message: t("validations.emailFormat") }]}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input />
            </Form.Item>
          </Flex>
          <Form.Item>
            <Flex gap={10} justify={"flex-end"}>
              <Button type={"primary"} loading={isPending} htmlType={"submit"}>
                {t("users.save")}
              </Button>
              <Button
                danger
                type={"primary"}
                onClick={() => navigate(`${ADMIN_ROUTES.USERS}/show/${userId}`)}
              >
                {t("users.cancelEdit")}
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default UserEdit;
