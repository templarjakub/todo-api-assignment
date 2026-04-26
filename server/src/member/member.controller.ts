import { Controller, Post, Body, UseGuards, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiHeader } from '@nestjs/swagger';
import { AddMemberDto, RemoveMemberDto } from './member.dto';
import { RolesGuard } from '../auth/roles.guard';
import { MemberService } from './member.service';

import { UserProfile } from '../auth/profile.decorator';

@ApiTags('Member Management')
@Controller('member')
@UseGuards(RolesGuard)
@ApiHeader({ name: 'x-user-profile', required: true, description: 'Owner or Member' })
export class MemberController {
    constructor(private readonly memberService: MemberService) {}

    @Post('add')
    @ApiOperation({ summary: 'Invites a new member to the list (Owner Only)' })
    async addMember(@Body() dtoIn: AddMemberDto, @UserProfile() profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        const member = await this.memberService.add(dtoIn);
        return { dtoOut: member, uuAppErrorMap: {} };
    }

    @Post('remove')
    @ApiOperation({ summary: 'Removes a member from the list (Owner Only)' })
    async removeMember(@Body() dtoIn: RemoveMemberDto, @UserProfile() profile: string) {
        if (profile !== 'Owner') this.throwForbidden(profile);
        const result = await this.memberService.remove(dtoIn);
        return { dtoOut: result, uuAppErrorMap: {} };
    }

    private throwForbidden(profile: string) {
        throw new ForbiddenException({
            uuAppErrorMap: {
                "todo-api-assignment/member/forbidden": {
                    type: "error",
                    message: `Profile '${profile}' is not authorized to manage members.`
                }
            }
        });
    }
}