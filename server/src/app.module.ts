import { Module } from '@nestjs/common';
import { ListController } from './list/list.controller';
import { ItemController } from './item/item.controller';
import { MemberController } from './member/member.controller';

@Module({
  imports: [],
  controllers: [ListController, ItemController, MemberController],
  providers: [],
})
export class AppModule {}