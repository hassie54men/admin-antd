import { Input, type InputProps } from "antd";
import { type ChangeEvent, useEffect, useState } from "react";
import { useSearchQuery } from "../hooks/useSearchQuery.ts";
import { useDebounce } from "../hooks/useDebounce.ts";

export const Search = (props: InputProps) => {
  const { q, setQuery } = useSearchQuery();

  const [value, setValue] = useState(q);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return <Input.Search value={value} onChange={handleSearch} {...props} />;
};
