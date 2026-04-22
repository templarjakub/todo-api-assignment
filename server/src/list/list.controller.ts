import { Controller, Post, Body, UseGuards, ForbiddenException, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { UpdateListDto, ArchiveListDto } from './list.dto';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('List Management')
@Controller('list')
@UseGuards(RolesGuard)
@ApiHeader({ name: 'x-user-profile', required: true, description: 'Owner or Member' })
export class ListController {

    @Post('update')
    @ApiOperation({ summary: 'Renames the shopping list (Owner Only)' })
    updateList(@Body() dtoIn: UpdateListDto, @Headers('x-user-profile') profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);

        return { dtoIn, uuAppErrorMap: {} };
    }

    @Post('archive')
    @ApiOperation({ summary: 'Archives the shopping list (Owner Only)' })
    archiveList(@Body() dtoIn: ArchiveListDto, @Headers('x-user-profile') profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        return { dtoIn, uuAppErrorMap: {} };
    }
    
    private throwForbidden(profile: string) {
        throw new ForbiddenException({
            uuAppErrorMap: {
                "todo-firstweek/list/forbidden": {
                    type: "error",
                    message: `Profile '${profile}' is not authorized to manage lists.`
                }
            }
        });
    }
}