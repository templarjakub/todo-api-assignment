import { IsString, IsUUID, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateListDto {
    @ApiProperty({ description: 'The unique ID of the shopping list', format: 'uuid' })
    @IsUUID()
    id: string;

    @ApiProperty({ description: 'The new name of the list (max 50 chars)', maxLength: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name: string;
}

export class ArchiveListDto {
    @ApiProperty({ description: 'The unique ID of the shopping list to archive', format: 'uuid' })
    @IsUUID()
    id: string;
}