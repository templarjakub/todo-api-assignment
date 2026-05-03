import {Controller, Post, Body, UseGuards, ForbiddenException, HttpCode} from '@nestjs/common';
import {ApiTags, ApiOperation, ApiHeader, ApiResponse} from '@nestjs/swagger';
import {
    CreateListDto,
    GetListDto,
    UpdateListDto,
    DeleteListDto,
    ArchiveListDto,
    ListWrapperResponseDto
} from './list.dto';
import { RolesGuard } from '../auth/roles.guard';
import { ListService } from './list.service';

import { UserProfile } from '../auth/profile.decorator';

@ApiTags('List Management')
@Controller('list')
@UseGuards(RolesGuard)
@ApiHeader({ name: 'x-user-profile', required: true, description: 'Owner or Member' })
export class ListController {
    constructor(private readonly listService: ListService) {}

    @Post('create')
    @ApiOperation({ summary: 'Creates a new shopping list (Owner Only)' })
    async createList(@Body() dtoIn: CreateListDto, @UserProfile() profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);

        const list = await this.listService.create(dtoIn, 'u123');
        return { dtoOut: list, uuAppErrorMap: {} };
    }

    @Post('get')
    @ApiOperation({ summary: 'Retrieves a single shopping list' })
    async getList(@Body() dtoIn: GetListDto) {
        const list = await this.listService.get(dtoIn.id);
        return { dtoOut: list, uuAppErrorMap: {} };
    }

    @Post('list')
    @HttpCode(200)
    @ApiOperation({ summary: 'Retrieves all shopping lists' })
    @ApiResponse({ status: 200, description: 'List of all shopping lists', type: ListWrapperResponseDto })
    async listLists() {
        const lists = await this.listService.list();
        return { dtoOut: lists, uuAppErrorMap: {} };
    }

    @Post('update')
    @ApiOperation({ summary: 'Renames the shopping list (Owner Only)' })
    async updateList(@Body() dtoIn: UpdateListDto, @UserProfile('x-user-profile') profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        const updatedList = await this.listService.update(dtoIn);
        return { dtoOut: updatedList, uuAppErrorMap: {} };
    }

    @Post('delete')
    @ApiOperation({ summary: 'Deletes a shopping list (Owner Only)' })
    async deleteList(@Body() dtoIn: DeleteListDto, @UserProfile('x-user-profile') profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        const deletedList = await this.listService.delete(dtoIn.id);
        return { dtoOut: deletedList, uuAppErrorMap: {} };
    }

    @Post('archive')
    @ApiOperation({ summary: 'Archives the shopping list (Owner Only)' })
    archiveList(@Body() dtoIn: ArchiveListDto, @UserProfile('x-user-profile') profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        return { dtoIn, uuAppErrorMap: {} };
    }

    private throwForbidden(profile: string) {
        throw new ForbiddenException({
            uuAppErrorMap: {
                "todo-api-assignment/list/forbidden": {
                    type: "error",
                    message: `Profile '${profile}' is not authorized to manage lists.`
                }
            }
        });
    }
}