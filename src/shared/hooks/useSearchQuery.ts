import { useSearchParams } from "react-router";
import { useCallback } from "react";
const SEARCH_QUERY_KEY = "q";
export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(SEARCH_QUERY_KEY) ?? "";
  const setQuery = useCallback(
    (value: string) => setSearchParams({ [SEARCH_QUERY_KEY]: value }),
    [setSearchParams],
  );

  return { q, setQuery };
};
