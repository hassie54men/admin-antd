import { Button, Dropdown, type MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import { Languages } from "../types/common.ts";

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
    <Dropdown menu={{ items, style: { width: 120 } }} trigger={["click"]}>
      <Button variant={"solid"}>{t(`text.lang.${i18n.language}`)}</Button>
    </Dropdown>
  );
};

export default LocaleSwitcher;
