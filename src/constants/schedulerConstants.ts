export const times = [
  "8-9 AM",
  "9-10 AM",
  "10-11 AM",
  "11-12 PM",
  "12-1 PM",
  "1-2 PM",
  "3-4 PM",
  "4-5 PM",
  "5-6 PM",
  "6-7 PM",
  "7-8 PM",
];

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const initArray = (size: number, value: any): Array<any> => {
  var array: Array<any>;
  for (var i = 0, array = new Array(times.length); i < size; i++) {
    array[i] = value;
  }
  return array;
};

export const emptyArray = initArray(times.length, [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
]);
