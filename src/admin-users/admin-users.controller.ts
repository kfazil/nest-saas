import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('adminUsers')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.adminUsersService.findAll();
  }
}
