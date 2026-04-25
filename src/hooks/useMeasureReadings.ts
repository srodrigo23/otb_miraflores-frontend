import { useEffect } from "react";
import useFetchData from "./useFetchData";
import { MeterReadingType } from "../interfaces/measuresIterfaces";

export const useMeasureReadings = (idMeasure:number)=>{
  const serverPath = 'http://127.0.0.1:8000';
  const url = `${serverPath}/measures/${idMeasure}/meter-readings`

  const { data, isLoading, error, execute } = useFetchData<MeterReadingType[]>(url);

  useEffect(()=>{
    execute({
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  }, [])
  return { data, isLoading, error }
}