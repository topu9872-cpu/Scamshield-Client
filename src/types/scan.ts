export type ScanType = "url" | "email" | "phone" | "text";

// Define the shape of the result object returned from scannerPost
export interface ScanResult {
  score: number;
  summary: string;
  isScam: boolean;
  insights?: string[];
}

export interface Scan {
  type: ScanType;
  value: string;
}