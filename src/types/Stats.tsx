// import { Status } from "./Status";

export interface Stats {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage?: string | undefined;
  isActionRequired?: boolean | undefined;
  isAscending?: boolean | undefined;
}
