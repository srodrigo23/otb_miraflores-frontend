import { useEffect } from "react"
import useFetchData from "./useFetchData"
import { MeasureType } from "../interfaces/measuresIterfaces"

export const useMeasuresData = () => {
  const url = "http://127.0.0.1:8000/measures"
  const { data, isLoading, error, execute } = useFetchData<MeasureType[]>(url);

  useEffect(() => {
    execute({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  }, []);

  return { data, isLoading, error }
}