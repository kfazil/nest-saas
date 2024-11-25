import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('admin_users') // Specify the table name as 'admin_users'
export class AdminUser {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
