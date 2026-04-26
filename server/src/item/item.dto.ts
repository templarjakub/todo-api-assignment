import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
    @ApiProperty({ description: 'The ID of the list this item belongs to'})
    @IsString()
    listId!: string;

    @ApiProperty({ description: 'The text of the todo item' })
    @IsString()
    @IsNotEmpty()
    text!: string;
}

export class UpdateItemDto {
    @ApiProperty({ description: 'The ID of the list'})
    @IsString()
    listId!: string;

    @ApiProperty({ description: 'The ID of the specific item to update'})
    @IsString()
    itemId!: string;

    @ApiProperty({ description: 'Whether the item is checked off or not' })
    @IsBoolean()
    isResolved!: boolean;
}

export class DeleteItemDto {
    @ApiProperty({ description: 'The ID of the list'})
    @IsString()
    listId!: string;

    @ApiProperty({ description: 'The ID of the specific item to delete'})
    @IsString()
    itemId!: string;
}