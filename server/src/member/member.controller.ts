import { Controller, Post, Body, UseGuards, ForbiddenException, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { AddMemberDto, RemoveMemberDto } from './member.dto';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('Member Management')
@Controller('member')
@UseGuards(RolesGuard)
@ApiHeader({ name: 'x-user-profile', required: true, description: 'Owner or Member' })
export class MemberController {

    @Post('add')
    @ApiOperation({ summary: 'Invites a new member to the list (Owner Only)' })
    addMember(@Body() dtoIn: AddMemberDto, @Headers('x-user-profile') profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        return { dtoIn, uuAppErrorMap: {} };
    }

    @Post('remove')
    @ApiOperation({ summary: 'Removes a member from the list (Owner Only)' })
    removeMember(@Body() dtoIn: RemoveMemberDto, @Headers('x-user-profile') profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        return { dtoIn, uuAppErrorMap: {} };
    }

    private throwForbidden(profile: string) {
        throw new ForbiddenException({
            uuAppErrorMap: {
                "todo-firstweek/member/forbidden": {
                    type: "error",
                    message: `Profile '${profile}' is not authorized to manage members.`
                }
            }
        });
    }
}