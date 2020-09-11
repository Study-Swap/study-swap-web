export const times: string[] = [
  "8-9 AM",
  "9-10 AM",
  "10-11 AM",
  "11-12 PM",
  "12-1 PM",
  "1-2 PM",
  "2-3 PM",
  "3-4 PM",
  "4-5 PM",
  "5-6 PM",
  "6-7 PM",
  "7-8 PM",
];

export const days: string[] = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const initArray = (size: number, value: boolean[]): Array<any> => {
  var array: Array<any>;
  for (var i = 0, array = new Array(times.length); i < size; i++) {
    array[i] = [...value];
  }
  return array;
};

export const emptyArray: boolean[][] = initArray(times.length, [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);

export const arrayToTimes = (timeSlots: boolean[][]): string[] => {
  const stringTimes: string[] = [];
  for (var j = 0; j < timeSlots[0].length; j++) {
    var timeOptions = "";
    for (var i = 0; i < timeSlots.length; i++) {
      if (timeSlots[i][j]) {
        timeOptions = timeOptions.concat(`${times[i]},`);
      }
    }
    stringTimes.push(timeOptions);
  }
  return stringTimes;
};

export const timesToArray = (stringTimes: string[]): boolean[][] => {
  var timeSlots: boolean[][] = initArray(times.length, [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  stringTimes.forEach((stringTime, index) => {
    const arrayTime = stringTime.split(",");
    arrayTime.forEach((time: string) => {
      if (time && time !== "") timeSlots[times.indexOf(time)][index] = true;
    });
  });
  return timeSlots;
};
