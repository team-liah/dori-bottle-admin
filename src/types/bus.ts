export interface IStation {
  id: string;
  name: string;
  enabled: boolean;
  backgroundUrl: string;
}

export interface IRoute {
  id: string;
  name: string;
  distance: number;
  intervalMinute: number;
  takenMinute: number;
  enabled: boolean;
  fromStation: IStation;
  toStation: IStation;
}

export interface IBusGrade {
  gradeName: string;
}

export interface IBusCompany {
  companyName: string;
  iconUrl: string;
}
export interface IBus {
  id: string;
  grade: IBusGrade;
  name: string;
  company: IBusCompany;
  maxColumn: number;
  maxSeat: number;
  startedHour: number;
  startedMinute: number;
  enabled: boolean;
  route: IRoute;
}
