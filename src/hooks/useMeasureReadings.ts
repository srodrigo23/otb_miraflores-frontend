import { useEffect } from "react";
import useFetchData from "./useFetchData";

export const useMeasureReadings = (idMeasure:number)=>{
  const url = 'http://127.0.0.1:8000';

  const { data, isLoading, error, execute } = useFetchData(`${url}/measures/${idMeasure}/meter-readings`);

  useEffect(()=>{
    execute({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  }, [])
  return { data, isLoading, error }
}