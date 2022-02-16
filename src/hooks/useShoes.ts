import axios from "axios";
import useSWR from "swr";

axios.defaults.baseURL = "http://localhost:3000";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useShoes = (id = "") => {
  const { data, error } = useSWR(`/api/shoes/${id}`, fetcher);

  return {
    shoes: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export default useShoes;
