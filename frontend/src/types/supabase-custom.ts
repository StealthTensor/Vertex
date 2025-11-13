export type Json = 
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface GoscrapeRow {
  regNumber: string;
  token: string; // encoded token (utils.Encode(cookie))
  user?: Json; // encrypted JSON in DB, decrypted at read
  timetable?: Json; // plaintext JSON string in DB per Go; treat as parsed JSON in app
  attendance?: Json; // encrypted JSON in DB, decrypted at read
  marks?: Json; // encrypted JSON in DB, decrypted at read
  ophour?: string | null; // optional string fetched separately
  lastUpdated?: number; // epoch ms
}

export interface GocalRow {
  id?: string | number;
  date: string; // e.g., "1"
  month: string; // e.g., "Jan '25"
  day: string; // Monday, Tuesday, ...
  order: string; // day order like "1" | "-"
  event: string; // Holiday, Event, etc.
  created_at?: number; // epoch ms
}
