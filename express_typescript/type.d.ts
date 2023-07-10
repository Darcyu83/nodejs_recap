declare global {
  interface Error {
    status?: number;
  }
}

export {};

// import { SessionData } from "express-session";

// declare module "express-session" {
//   export interface SessionData {
//     jwt?: string;
//   }
// }
