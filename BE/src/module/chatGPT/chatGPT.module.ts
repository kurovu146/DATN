import { Module } from "@nestjs/common";
import { ChatGPTController } from "./chatGPT.controller";
import { ChatGPTServices } from "./chatGPT.service";

@Module({
  providers: [ChatGPTServices],
  controllers: [ChatGPTController],
})
export class ChatGPTModule {}