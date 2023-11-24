import useSWR from "swr";
import {api as axiosApi} from "../utils/axiosapi";

const fetcher = url => axiosApi.get(url).then(res => res.data);

function useVisits() {
  //TODO: Get location dynamically
  const { data, error, isLoading } = useSWR(`/visits/withname/154`, fetcher);

  return {
    visits: data,
    isLoading,
    isError: error,
  };
}

export default useVisits;
