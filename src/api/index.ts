
const API_URL = 'https://covid19.mathdro.id/api'

type Example = { [key in 'example' | 'pattern']: string }
type Detail = { detail: string; value: number };
type Confirmed = {
  total: number;
  china: number;
  outsideChina: number;
}

export interface CovidResponse {
  confirmed: Detail;
  countries: string;
  countryDetail: Example;
  dailySummary: string;
  dailyTimeSeries: Example;
  deaths: Detail;
  image: string;
  lastUpdate: Date;
  recovered: Detail;
  source: string;
}

export interface DailyData {
  active: number;
  confirmed: Confirmed;
  deaths: Confirmed;
  deltaConfirmed: number;
  deltaConfirmedDetail: Confirmed;
  deltaRecovered: number;
  incidentRate: number;
  mainlandChina: number;
  otherLocations: number;
  peopleTested: number;
  recovered: Confirmed;
  reportDate: Date;
  totalConfirmed: number;
  totalRecovered: number;
}

export interface Countries {
  countries: Country[];
}

export type Country = {
  [key in 'name' | 'iso2' | 'iso3']: string;
};

export interface CountryDetail {
  confirmed: Detail;
  recovered: Detail;
  deaths: Detail;
  lastUpdate: Date;
}

interface HttpResponse<T> extends Response {
  data?: T;
}

export async function fetchData<T>(request: RequestInfo): Promise<T> {
  const response: HttpResponse<T> = await fetch(API_URL + request);
  if (!response.ok) throw new Error(`while fetching ${request}:\n${JSON.stringify(response)}`)
  return await response.json();
}
