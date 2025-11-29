import { Dropdown, type MenuProps, Space } from "antd";
import { useTranslation } from "react-i18next";
import { LANGUAGES_LIST } from "../../../config/languages.ts";

function DownOutlined() {
  return null;
}

const LocaleSwitcher = () => {
  const { i18n } = useTranslation();
  const items: MenuProps["items"] = LANGUAGES_LIST.map(({ key, label }) => ({
    key,
    label,
    onClick: () => i18n.changeLanguage(key),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {LANGUAGES_LIST.find((lang) => lang.key === i18n.language)?.label ||
            "..."}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default LocaleSwitcher;
