import { useSearchQuery } from "../hooks/useSearchQuery.ts";
import { type ChangeEvent, useEffect, useState } from "react";
import { Input } from "antd";
import { useDebounce } from "../hooks/useDebounce.ts";

const Search = () => {
  const { q, setQuery } = useSearchQuery();
  const [value, setValue] = useState(q);
  const debouncedValue = useDebounce(value, 300);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
  };
  useEffect(() => {
    setQuery(debouncedValue);
  }, [setQuery, debouncedValue]);
  return (
    <Input.Search
      style={{ maxWidth: 320 }}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Search;
