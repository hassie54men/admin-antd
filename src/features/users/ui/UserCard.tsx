import { useTranslation } from "react-i18next";
import { useGetUser } from "../model/user.queries.ts";
import { useParams } from "react-router";
import { Card, Flex, Form, Input } from "antd";

const UserCard = () => {
  const { id } = useParams();
  const userId = String(id);
  const { t } = useTranslation();
  const { data, isError, isLoading } = useGetUser(userId);

  if (isError) {
    return <div>{t("users.error")}</div>;
  }
  return (
    <>
      <Card loading={isLoading}>
        <Form layout="vertical">
          <Flex gap={16} wrap>
            <Form.Item label={t("users.id")} style={{ flex: 1, minWidth: 200 }}>
              <Input value={data?.id} disabled />
            </Form.Item>
            <Form.Item
              label={t("users.firstName")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.firstName} disabled />
            </Form.Item>
            <Form.Item
              label={t("users.lastName")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.lastName} disabled />
            </Form.Item>
            <Form.Item
              label={t("users.age")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.age} disabled />
            </Form.Item>
            <Form.Item
              label={t("users.gender")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.gender} disabled />
            </Form.Item>
            <Form.Item
              label={t("users.email")}
              style={{ flex: 1, minWidth: 200 }}
            >
              <Input value={data?.email} disabled />
            </Form.Item>
          </Flex>
        </Form>
      </Card>
    </>
  );
};

export default UserCard;
