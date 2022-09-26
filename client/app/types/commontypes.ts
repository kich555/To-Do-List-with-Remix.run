export interface CaughtError extends Error {
  statusText: string;
  status: number;
  data?: any;
}
