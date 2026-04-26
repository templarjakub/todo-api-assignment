import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddMemberDto, RemoveMemberDto } from './member.dto';

@Injectable()
export class MemberService {
    constructor(private prisma: PrismaService) {}

    async add(dto: AddMemberDto) {
        const mockUserId = 'user-' + Math.floor(Math.random() * 10000);

        return this.prisma.member.create({
            data: {
                listId: dto.listId,
                name: dto.name,
                userId: mockUserId,
            },
        });
    }

    async remove(dto: RemoveMemberDto) {
        await this.prisma.member.deleteMany({
            where: {
                listId: dto.listId,
                userId: dto.userId,
            },
        });

        return { status: 'Member removed successfully' };
    }
}