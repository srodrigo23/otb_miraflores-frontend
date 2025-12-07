export interface MeasureType {
  id: number;
  measure_date: string;
  period: string | null;
  reader_name: string | null;
  status: string;
  total_meters: number;
  meters_read: number;
  meters_pending: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}
