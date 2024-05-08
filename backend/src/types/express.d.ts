import { UserPayload } from "../utils/types";

declare module "express-serve-static-core" {
  export interface Request {
    user?: UserPayload;
  }
}
