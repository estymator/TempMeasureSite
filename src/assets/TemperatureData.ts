export class TemperatureData{
    private temperature: number;
    private date: Date;

    constructor(temperature: number, date: Date){
        this.temperature=temperature;
        this.date=date;
    }

    getTemperature(): number{
        return this.temperature;
    }

    getDate(): Date{
        return this.date;
    }
}