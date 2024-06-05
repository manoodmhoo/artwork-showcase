import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';

require('dotenv').config();

export class Authorize implements CanActivate {
  async canActivate(ExecutionContext) { 
      if(!ExecutionContext.args[0].headers.authorization) {
        return false;
      }
      
      const token = ExecutionContext.args[0].headers.authorization.split(' ')[1];
        let accessType = false
        try {
            const tokenVerify = jwt.verify(token, process.env.JWT_SECRET);
            if (tokenVerify) {
                accessType = true;
            } else {
                accessType = false;
            }
        } catch (error) {
            accessType = false;
        }
      return accessType;
  }
  
}