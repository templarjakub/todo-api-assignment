import { IsString, IsUUID, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
    @ApiProperty({ description: 'The ID of the list this item belongs to', format: 'uuid' })
    @IsUUID()
    listId: string;

    @ApiProperty({ description: 'The text of the todo item' })
    @IsString()
    @IsNotEmpty()
    text: string;
}

export class UpdateItemDto {
    @ApiProperty({ description: 'The ID of the list', format: 'uuid' })
    @IsUUID()
    listId: string;

    @ApiProperty({ description: 'The ID of the specific item to update', format: 'uuid' })
    @IsUUID()
    itemId: string;

    @ApiProperty({ description: 'Whether the item is checked off or not' })
    @IsBoolean()
    isResolved: boolean;
}

export class DeleteItemDto {
    @ApiProperty({ description: 'The ID of the list', format: 'uuid' })
    @IsUUID()
    listId: string;

    @ApiProperty({ description: 'The ID of the specific item to delete', format: 'uuid' })
    @IsUUID()
    itemId: string;
}