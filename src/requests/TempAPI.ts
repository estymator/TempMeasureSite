import axios from 'axios';
import { TempDTO } from './TempDTO';
import {
  tempEndpoint,
  tempsEndpoint,
} from '@/components/AxiosConfig/AxiosConstants';

interface TempAPI {
  getTemp(temp: TempDTO): void;
  getTemps(): void;
}

export class TempApiImplementation implements TempAPI {
  getTemp(temp: TempDTO): void {
    axios
      .get(tempEndpoint)
      .then((response) => {
        let data: String = response.data;
        temp.temperature = new Number(data.split('-')[0]);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  getTemps(): void {
    axios
      .get(tempsEndpoint)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
