import useSWR from "swr";
import {api as axiosApi} from "../utils/axiosapi";

const fetcher = url => axiosApi.get(url);

function useUsers(id) {
  const { data, error, isLoading } = useSWR(`/visitors`, fetcher);

  return {
    users: data,
    isLoading,
    isError: error,
  };
}

export default useUsers;
