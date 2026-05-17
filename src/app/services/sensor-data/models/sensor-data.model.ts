export interface IAppInfo {
  localisation: ISensorLocalisation;
  temperature: ISensorValue;
  pollutionA: ISensorValue;
  pollutionB: ISensorValue;
}

export interface ISensorLocalisation {
  latitude: number;
  longitude: number;
  time: Date;
}

export interface ISensorValue {
  value: number;
  time: Date;
}

export interface IAppHistoryInfo {
  localisations: ISensorLocalisation[];
  temperatures: ISensorValue[];
  pollutionAs: ISensorValue[];
  pollutionBs: ISensorValue[];
}
