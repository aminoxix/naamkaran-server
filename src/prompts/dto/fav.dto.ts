import { $Enums } from '@prisma/client';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class FavDTO {
  // basic prompt fields
  @IsOptional()
  id: string;

  // combos fields
  @IsOptional()
  partner1: string;

  @IsOptional()
  partner2: string;

  // fav & username field
  @IsOptional()
  name: string;

  // only fav fields
  @IsOptional()
  aim: string;

  @IsOptional()
  hobby: string;

  @IsOptional()
  animal: string;

  @IsOptional()
  background: string;

  // name count field
  @IsOptional()
  worded: $Enums.WordedEnum;

  // targeting fields
  @IsBoolean()
  isFav: boolean;

  @IsBoolean()
  isCombo: boolean;

  @IsBoolean()
  isUsername: boolean;

  // user field
  @IsString()
  userId: string;
}
