import { Dropdown, type MenuProps, Space } from "antd";
import { useTranslation } from "react-i18next";

function DownOutlined() {
  return null;
}

const LocaleSwitcher = () => {
  const { i18n, t } = useTranslation();
  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng);
  };
  const items: MenuProps["items"] = [
    {
      key: "label",
      type: "group",
      label: t("text.languagesLabel"),
    },
    {
      label: <span onClick={() => changeLanguage("en")}>English</span>,
      key: "en",
    },
    {
      label: <span onClick={() => changeLanguage("ru")}>Русский</span>,
      key: "ru",
    },
  ];
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {t("text.language")}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default LocaleSwitcher;
