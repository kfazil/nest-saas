// src/plans/plans.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plan } from './entities/plan.entity';

@Injectable()
export class PlansService {
  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  async create(planData: Partial<Plan>): Promise<Plan> {
    const plan = this.planRepository.create(planData);
    return this.planRepository.save(plan);
  }

  async findAll(): Promise<Plan[]> {
    return this.planRepository.find();
  }

  async findOne(id: number): Promise<Plan> {
    return this.planRepository.findOne({ where: { id: id } });
  }

  async update(id: number, updateData: Partial<Plan>): Promise<Plan> {
    await this.planRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.planRepository.delete(id);
  }
}
