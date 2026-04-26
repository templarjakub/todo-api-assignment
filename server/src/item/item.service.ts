import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto, UpdateItemDto, DeleteItemDto } from './item.dto';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateItemDto) {
        return this.prisma.item.create({
            data: {
                listId: dto.listId,
                text: dto.text,
                isResolved: false,
            },
        });
    }

    async update(dto: UpdateItemDto) {
        return this.prisma.item.update({
            where: { id: dto.itemId },
            data: { isResolved: dto.isResolved },
        });
    }

    async delete(dto: DeleteItemDto) {
        return this.prisma.item.delete({
            where: { id: dto.itemId },
        });
    }
}