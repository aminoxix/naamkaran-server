import { IsNotEmpty, IsString } from 'class-validator';

export class ChatCompletionMessageDto {
  @IsString()
  @IsNotEmpty()
  role: 'user' | 'system' | 'assistant';

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
