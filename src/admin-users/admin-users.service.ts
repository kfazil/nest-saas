import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminUser } from './entities/admin-user.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private adminUsersRepository: Repository<AdminUser>,

    @Inject(forwardRef(() => AuthService)) // Use forwardRef for dependency injection
    private authService: AuthService,
  ) {}

  async onModuleInit() {
    // Seed the admin user on startup
    await this.seedAdminUser();
  }

  async create(user: AdminUser): Promise<AdminUser> {
    return this.adminUsersRepository.save(user);
  }

  async findAll(): Promise<AdminUser[]> {
    return this.adminUsersRepository.find();
  }

  async findOne(id: number): Promise<AdminUser> {
    return this.adminUsersRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<AdminUser | undefined> {
    return this.adminUsersRepository.findOne({
      where: { username },
    });
  }

  async update(id: number, user: AdminUser): Promise<AdminUser> {
    await this.adminUsersRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.adminUsersRepository.delete(id);
  }

  // // Seed the admin user if it doesn't exist
  async seedAdminUser() {
    // Check if an admin user already exists
    const adminUser = await this.adminUsersRepository.findOne({
      where: {
        username: 'admin',
      },
    });

    // If admin user doesn't exist, create one
    if (!adminUser) {
      const hashedPassword = await this.authService.hashPassword('12345678'); // Use AuthService to hash the password
      const newUser = this.adminUsersRepository.create({
        username: 'admin',
        password: hashedPassword,
      });

      await this.adminUsersRepository.save(newUser);
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }
  }
}
