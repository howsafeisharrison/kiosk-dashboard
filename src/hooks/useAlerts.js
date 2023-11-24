import useSWR from "swr";
import {api as axiosApi} from "../utils/axiosapi";

const fetcher = url => axiosApi.get(url).then(res => res.data);

function useAlerts(id) {
    //TODO: Get location dynamically
  const { data, error, isLoading } = useSWR(`/visitors/siterules/1051/154`, fetcher);

  return {
    alerts: data,
    isLoading,
    isError: error,
  };
}

export default useAlerts;
