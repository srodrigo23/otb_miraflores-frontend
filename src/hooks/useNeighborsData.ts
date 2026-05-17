import { useEffect } from "react"
import useFetchData from "./useFetchData"
import { apiLink } from "../config"
import { NeighborType } from "../interfaces/neighborsInterfaces"

export const useNeighborsData = () => {
  
  const apiLinkNeightbors = `${apiLink}/neighbors`
  
  const { data, isLoading, error, execute } = useFetchData<NeighborType[]>(apiLinkNeightbors);

  useEffect(() => {
    execute({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  }, []);

  const refetch = () => execute({
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  return { data, isLoading, error, refetch }
}