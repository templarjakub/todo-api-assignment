import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ListController } from './list/list.controller';
import { ListService } from './list/list.service';
import { ItemController } from './item/item.controller';
import { ItemService } from './item/item.service';
import { MemberController } from './member/member.controller';
import { MemberService } from './member/member.service';

@Module({
  imports: [PrismaModule],
  controllers: [ListController, ItemController, MemberController],
  providers: [ListService, ItemService, MemberService],
})
export class AppModule {}