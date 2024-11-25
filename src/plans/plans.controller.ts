// src/plans/plans.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { Plan } from './entities/plan.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  // Only admin can access this route
  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles', ['admin']) // You could add roles metadata if needed
  @Post()
  async create(@Body() planData: Partial<Plan>): Promise<Plan> {
    return this.plansService.create(planData);
  }

  @Get()
  async findAll(): Promise<Plan[]> {
    return this.plansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Plan> {
    return this.plansService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<Plan>,
  ): Promise<Plan> {
    return this.plansService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.plansService.remove(id);
  }
}
