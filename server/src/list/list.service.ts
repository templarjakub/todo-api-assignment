import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto, UpdateListDto } from './list.dto';

@Injectable()
export class ListService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateListDto, ownerId: string) {
        return this.prisma.list.create({
            data: {
                name: dto.name,
                ownerId: ownerId,
            },
            include: {
                items: true,
                members: true
            }
        });
    }

    async get(id: string) {
        return this.prisma.list.findUnique({
            where: { id },
            include: { items: true, members: true },
        });
    }

    async list() {
        return this.prisma.list.findMany({
            include: {
                items: true,
                members: true
            }
        });
    }

    async update(dto: UpdateListDto) {
        return this.prisma.list.update({
            where: { id: dto.id },
            data: { name: dto.name },
        });
    }

    async delete(id: string) {
        return this.prisma.list.delete({
            where: { id },
        });
    }
}