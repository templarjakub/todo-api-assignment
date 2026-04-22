import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMemberDto {
    @ApiProperty({ description: 'The ID of the list to add the member to', format: 'uuid' })
    @IsString()
    listId: string;

    @ApiProperty({ description: 'The name of the invited collaborator' })
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class RemoveMemberDto {
    @ApiProperty({ description: 'The ID of the list', format: 'uuid' })
    @IsString()
    listId: string;

    @ApiProperty({ description: 'The specific user ID of the member to remove', format: 'uuid' })
    @IsString()
    userId: string;
}