import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { AdminUser } from 'src/admin-users/entities/admin-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

    @Inject(forwardRef(() => AdminUsersService)) // Use forwardRef for dependency injection
    private adminUsersService: AdminUsersService, // Inject AdminUsersService
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async validateUser(username: string, password: string): Promise<any> {
    // Retrieve the user by username
    const user: AdminUser =
      await this.adminUsersService.findByUsername(username);

    // Check if user exists and passwords match
    if (user && (await bcrypt.compare(password, user.password))) {
      // Return user details if validation is successful
      return { userId: user.id, username: user.username };
    }

    // Return null if validation fails
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
