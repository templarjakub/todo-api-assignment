import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { CreateItemDto, UpdateItemDto, DeleteItemDto } from './item.dto';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Item Management')
@Controller('item')
@UseGuards(RolesGuard)
@ApiHeader({ name: 'x-user-profile', required: true, description: 'Owner or Member' })
export class ItemController {

    @Post('create')
    @ApiOperation({ summary: 'Adds a new item to the list' })
    createItem(@Body() dtoIn: CreateItemDto) {
        return { dtoIn, uuAppErrorMap: {} };
    }

    @Post('update')
    @ApiOperation({ summary: 'Toggles the item resolution status' })
    updateItem(@Body() dtoIn: UpdateItemDto) {
        return { dtoIn, uuAppErrorMap: {} };
    }

    @Post('delete')
    @ApiOperation({ summary: 'Removes an item from the list' })
    deleteItem(@Body() dtoIn: DeleteItemDto) {
        return { dtoIn, uuAppErrorMap: {} };
    }
}