import useSWR from "swr";
import { fetcher } from "../axios/instance";

export const useGetData = (url: string) => {
    const pathKey = url
    const { data, error , isLoading} = useSWR(pathKey, fetcher);
      return { data: data , loading: !error && !data , isLoading: isLoading, error: error };
};