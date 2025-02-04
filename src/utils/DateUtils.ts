export function convertDateToString(dateToFormat: Date): string {
  let formattedDate: string =
    dateToFormat.getDate() +
    '/' +
    (dateToFormat.getMonth()+1) +
    '/' +
    dateToFormat.getFullYear();
  let formattedTime: string =
    dateToFormat.getHours() +
    ':' +
    dateToFormat.getMinutes();
  return formattedDate + '  ' + formattedTime;
}

export function fetchDateFromString(dateString : String) :Date{
    let dateTimeSplit:string[] = dateString.split(" ");
    let datePart: string = dateTimeSplit[1];
    let timePart: string = dateTimeSplit[2];
    let dateParsed: string[] = datePart.split('/');
    let timeParsed: string[] = timePart.split(':');
    return new Date(+dateParsed[2], +dateParsed[1], +dateParsed[0], +timeParsed[0], +timeParsed[1]);
}
