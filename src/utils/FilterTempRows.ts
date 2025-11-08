import { ChartFilter } from '@/model/ChartFilter';
import { TempDTO } from '@/requests/TempDTO';

export function filterTempRows(
  tempRows: TempDTO[],
  filter: ChartFilter
): TempDTO[] {
  if (
    Number.isNaN(filter.startDate.getTime()) ||
    Number.isNaN(filter.endDate.getTime())
  ) {
    return tempRows;
  }
  return tempRows
    .filter((temp) => temp.date >= filter.startDate)
    .filter((temp) => temp.date <= filter.endDate);
}
