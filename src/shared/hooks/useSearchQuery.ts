import { useSearchParams } from "react-router";
import { SEARCH_QUERY_KEY } from "../constants/common.ts";
import { useCallback } from "react";

export const useSearchQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(SEARCH_QUERY_KEY) ?? "";

  const setQuery = useCallback(
    (value: string) => setSearchParams({ [SEARCH_QUERY_KEY]: value }),
    [setSearchParams],
  );

  return { q, setQuery };
};
