import {Injectable} from '@angular/core';
import bcrypt from 'bcryptjs';


const DEFAULT_SALT_ROUNDS = 10;

@Injectable({
  providedIn: 'root'
})
export class PasswordHashingService { // TODO: remove
  async generateSalt(rounds: number = DEFAULT_SALT_ROUNDS): Promise<string> {
    return bcrypt.genSalt(rounds);
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
