import { Controller, Get } from "@nestjs/common";
import { ChatGPTServices } from "./chatGPT.service";

@Controller('chatGPT')
export class ChatGPTController {
  constructor( public chatGPTService: ChatGPTServices) {}

  @Get()
  async testChatGPT() {
    console.log('Here');
    
    await this.chatGPTService.testChatGPT();
  }
}