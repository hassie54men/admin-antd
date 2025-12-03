import { Dropdown, type MenuProps, Space } from "antd";
import { useTranslation } from "react-i18next";
import { Languages } from "../types/common.ts";

function DownOutlined() {
  return null;
}

const LANGUAGES_LIST = [
  { key: Languages.RU, label: "Русский" },
  { key: Languages.EN, label: "English" },
];

const LocaleSwitcher = () => {
  const { i18n, t } = useTranslation();
  const items: MenuProps["items"] = LANGUAGES_LIST.map(({ key, label }) => ({
    key,
    label,
    onClick: () => i18n.changeLanguage(key),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {t(`text.lang.${i18n.language}`)}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default LocaleSwitcher;
