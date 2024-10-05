export interface Station {
  stationuuid: string;
  name: string;
  url: string;
  url_resolved: string;
  homepage: string;
  favicon: string;
  country: string;
  countrycode: string;
  state?: string; // Pode ser opcional
  language?: string; // Pode ser opcional
  votes: number;
  lastchangetime: string;
  codec: string;
  bitrate: number;
  hls: number;
  lastcheckok: number;
  lastchecktime: string;
  clickcount: number;
  clicktrend: number;
  ssl_error: number;
  geo_lat?: number; // Pode ser opcional
  geo_long?: number; // Pode ser opcional
  has_extended_info: boolean;
}
