import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminUser } from './entities/admin-user.entity'; // Import the AdminUser entity
import { AdminUsersService } from './admin-users.service';
import { AdminUsersController } from './admin-users.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminUser]),
    forwardRef(() => AuthModule), // Forward reference for potential circular dependency
  ],
  providers: [AdminUsersService],
  controllers: [AdminUsersController],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
