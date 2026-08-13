export interface ScanHistory {
  userEmail: string;
  type: "url" | "email" | "phone" | "text";
  value: string;
  score: number;
  isScam: boolean;
  summary: string;
  insights: string[];
  createdAt: Date;
}