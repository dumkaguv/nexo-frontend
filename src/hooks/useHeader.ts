import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDebouncedValue } from "@/hooks";
import { Api } from "@/services/apiClient";
import { getAccessToken } from "@/utils";

export const useHeader = () => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebouncedValue(searchValue, 400);

  const { data: usersSearch, isPending: isPendingSearch } = useQuery({
    queryKey: ["usersSearch", debouncedValue],
    queryFn: () => Api.users.getUserByUserOrFullName(debouncedValue),
    enabled: !!debouncedValue,
  });

  const { isPending: isPendingProfile } = useQuery({
    queryKey: ["getProfile"],
    queryFn: Api.profile.getProfile,
    enabled: !!getAccessToken(),
  });

  return {
    usersSearch,
    searchValue,
    setSearchValue,
    isPendingSearch,
    isPendingProfile,
  };
};
