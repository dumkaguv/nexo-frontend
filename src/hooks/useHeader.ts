import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@/hooks";
import { Api } from "@/services/apiClient";
import { QueryKeys } from "@/config";

export const useHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebouncedValue(searchValue, 400);

  const { data: usersSearch, isPending: isPendingSearch } = useQuery({
    queryKey: [QueryKeys.Users.search({ debouncedValue })],
    queryFn: () => Api.users.getUserByUserOrFullName(debouncedValue),
    enabled: !!debouncedValue,
  });

  return {
    usersSearch,
    searchValue,
    setSearchValue,
    isPendingSearch,
  };
};
