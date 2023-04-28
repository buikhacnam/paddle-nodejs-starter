
import { JwtPayload } from '../JwtPayload.js';

declare global {
  namespace Express {
    export interface Request {
      jwtPayload: JwtPayload;
    }
  
  }
}
