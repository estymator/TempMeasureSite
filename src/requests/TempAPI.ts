import axios from 'axios';
import { TempDTO } from './TempDTO';
import { tempEndpoint, tempsEndpoint } from '@/requests/AxiosConstants';
import { fetchDateFromString } from '@/utils/DateUtils';

interface TempAPI {
  getTemp(temp: TempDTO): void;
  getTemps(temperatures: TempDTO[]): void;
}

export class TempApiImplementation implements TempAPI {
  getTemp(temp: TempDTO): void {
    axios
      .get(tempEndpoint)
      .then((response) => {
        let data: String[] = response.data.split('-');
        temp.temperature = +data[0];
        temp.date = fetchDateFromString(data[1]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTemps(temperatures: TempDTO[]): void {
    axios
      .get(tempsEndpoint)
      .then((response) => {
        let data: String = response.data;
        data.split('\n').forEach((tempRow) => {
          let parsedRow: String[] = tempRow.split('-');
          if (parsedRow.length === 2) {
            temperatures.push(
              new TempDTO(+parsedRow[0], fetchDateFromString(parsedRow[1]))
            );
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
