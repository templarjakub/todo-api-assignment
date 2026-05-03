import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
    @ApiProperty({ description: 'The name of the new list (max 50 chars)', maxLength: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name!: string;
}

export class GetListDto {
    @ApiProperty({ description: 'The unique ID of the shopping list to retrieve' })
    @IsString()
    @IsNotEmpty()
    id!: string;
}

export class UpdateListDto {
    @ApiProperty({ description: 'The unique ID of the shopping list' })
    @IsString()
    @IsNotEmpty()
    id!: string;

    @ApiProperty({ description: 'The new name of the list (max 50 chars)', maxLength: 50 })
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    name!: string;
}

export class DeleteListDto {
    @ApiProperty({ description: 'The unique ID of the shopping list to delete' })
    @IsString()
    @IsNotEmpty()
    id!: string;
}

export class ArchiveListDto {
    @ApiProperty({ description: 'The unique ID of the shopping list to archive'})
    @IsString()
    id!: string;
}

class MinimalItemDto {
    @ApiProperty() id!: string;
    @ApiProperty() text!: string;
    @ApiProperty() isResolved!: boolean;
}

class MinimalMemberDto {
    @ApiProperty() id!: string;
    @ApiProperty() name!: string;
}

export class ListResponseDto {
    @ApiProperty() id!: string;
    @ApiProperty() name!: string;
    @ApiProperty() ownerId!: string;
    @ApiProperty() isArchived!: boolean;

    @ApiProperty({ type: [MinimalItemDto] }) items!: MinimalItemDto[];
    @ApiProperty({ type: [MinimalMemberDto] }) members!: MinimalMemberDto[];
}

export class ListWrapperResponseDto {
    @ApiProperty({ type: [ListResponseDto] })
    dtoOut!: ListResponseDto[];

    @ApiProperty()
    uuAppErrorMap!: Record<string, any>;
}