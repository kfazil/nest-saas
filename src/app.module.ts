import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { PlansModule } from './plans/plans.module';

// entities
import { AdminUser } from './admin-users/entities/admin-user.entity';
import { Plan } from './plans/entities/plan.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the configuration globally available in the app
      envFilePath: '.env', // Path to your .env file
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // or another database type
      host: process.env.DATABASE_HOST, // Load from the .env file
      port: +process.env.DATABASE_PORT, // Convert the port to a number
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [AdminUser, Plan],
    }),
    AuthModule,
    AdminUsersModule,
    PlansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
