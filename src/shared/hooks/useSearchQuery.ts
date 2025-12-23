import { useSearchParams } from "react-router";
import { useCallback } from "react";
const SEARCH_QUERY_KEY = "q";
const LIMIT_KEY = "limit";
const SKIP_KEY = "skip";
export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(SEARCH_QUERY_KEY) ?? "";
  const limit = Number(searchParams.get(LIMIT_KEY) ?? "10");
  const skip = Number(searchParams.get(SKIP_KEY) ?? "0");

  const page = skip / limit + 1;
  const pageSize = limit;
  const setQuery = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(SEARCH_QUERY_KEY, value);
      params.set(LIMIT_KEY, String(limit));
      params.set(SKIP_KEY, String(skip));
      setSearchParams(params, { replace: true });
    },
    [searchParams, setSearchParams, limit, skip],
  );

  return { q, setQuery, page, skip, limit, pageSize };
};
