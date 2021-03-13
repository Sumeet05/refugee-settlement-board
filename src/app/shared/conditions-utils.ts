
export const NUM_CONDITIONS_LIST = [
  { value: "none", label: "None" },
  { value: "is-greater-than-equal-to", label: "Greater than equal to" },
  { value: "is-lesser-than-equal-to", label: "Lesser than equal to" },
  { value: "is-num-equal", label: "Equals" },
  { value: "is-num-not-equal", label: "Not Equals" },
];

export const STRING_CONDITIONS_LIST = [
  { value: "none", label: "None" },
  { value: "is-contains", label: "Contains" },
  { value: "is-not-contains", label: "Not Contains" },
  { value: "is-equal", label: "Equals" },
  { value: "is-not-equal", label: "Not Equals" },
]

export const DATE_CONDITIONS_LIST = [
  { value: "none", label: "None" },
  { value: "is-on", label: "On" },
  { value: "is-before", label: "Before" },
  { value: "is-after", label: "After" },
]
export function compareDates(date1: Date, date2: Date): number {
  let d1 = new Date(date1); let d2 = new Date(date2);

  // Check if the dates are equal
  let same = d1.getTime() === d2.getTime();
  if (same) return 0;

  // Check if the first is greater than second
  if (d1 > d2) return 1;
  else return -1;
}

export const CONDITIONS_FUNCTIONS = {
  // search method base on conditions list value
  "is-greater-than-equal-to": function (value: number, filterdValue: number) {
    return +value >= +filterdValue;
  },
  "is-lesser-than-equal-to": function (value: number, filterdValue: number) {
    return +value <= +filterdValue;
  },
  "is-num-equal": function (value: number, filterdValue: number) {
    return +value == +filterdValue;
  },
  "is-num-not-equal": function (value: number, filterdValue: number) {
    return +value != +filterdValue;
  },
  "is-contains": function (value: string, filterdValue: string) {
    return value.toLocaleLowerCase().includes(filterdValue.toLocaleLowerCase());
  },
  "is-not-contains": function (value: string, filterdValue: string) {
    return !value.toLocaleLowerCase().includes(filterdValue.toLocaleLowerCase());
  },
  "is-equal": function (value: string, filterdValue: string) {
    return value.toLocaleLowerCase() == filterdValue.toLocaleLowerCase();
  },
  "is-not-equal": function (value: string, filterdValue: string) {
    return value.toLocaleLowerCase() != filterdValue.toLocaleLowerCase();
  },
  "is-on": function (value: Date, filterdValue: Date) {
    return compareDates(value, filterdValue) == 0;
  },
  "is-before": function (value: Date, filterdValue: Date) {
    return compareDates(value, filterdValue) == -1;
  },
  "is-after": function (value: Date, filterdValue: Date) {
    return compareDates(value, filterdValue) == 1;
  },
};