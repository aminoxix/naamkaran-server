import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { ChatCompletionMessageDto } from './chat-completion.dto';

export class ChatCompletionRequest {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatCompletionMessageDto)
  messages: ChatCompletionMessageDto;
}
