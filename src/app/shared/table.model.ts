
export interface TableItem {
  familySize: number,
  dateOfArrival: Date,
  familyName: string,
  firstName: string,
  gender: string,
  dob: Date,
  ages: number,
  cOO: string,
  maritalStatus: string,
  relationship: string,
  temporaryLocations: string,
  room: number,
  moveoutDate: Date,
  age6AndUnder: number,
  employment: string,
  yearsExp: number,
  sector: string,
  publicGR: string,
  postSecondary: string,
}

export interface TableDataSummary {
  title: string,
  value: string,
  color: string,
  icon: string,
}