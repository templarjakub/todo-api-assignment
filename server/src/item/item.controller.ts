import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { CreateItemDto, UpdateItemDto, DeleteItemDto } from './item.dto';
import { RolesGuard } from '../auth/roles.guard';
import { ItemService } from './item.service';

@ApiTags('Item Management')
@Controller('item')
@UseGuards(RolesGuard)
@ApiHeader({ name: 'x-user-profile', required: true, description: 'Owner or Member' })
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

    @Post('create')
    @ApiOperation({ summary: 'Adds a new item to the list' })
    async createItem(@Body() dtoIn: CreateItemDto) {
        const item = await this.itemService.create(dtoIn);
        return { dtoOut: item, uuAppErrorMap: {} };
    }

    @Post('update')
    @ApiOperation({ summary: 'Toggles the item resolution status' })
    async updateItem(@Body() dtoIn: UpdateItemDto) {
        const updatedItem = await this.itemService.update(dtoIn);
        return { dtoOut: updatedItem, uuAppErrorMap: {} };
    }

    @Post('delete')
    @ApiOperation({ summary: 'Removes an item from the list' })
    async deleteItem(@Body() dtoIn: DeleteItemDto) {
        const deletedItem = await this.itemService.delete(dtoIn);
        return { dtoOut: deletedItem, uuAppErrorMap: {} };
    }
}