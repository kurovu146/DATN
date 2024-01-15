import { Injectable } from "@nestjs/common";
import { OpenAI } from "openai";

@Injectable()
export class ChatGPTServices {
  private readonly openai: OpenAI;

  constructor(){
    this.openai = new OpenAI({
      apiKey: process.env.CHATGPT_API_KEY,
    })
  }

  async testChatGPT() {
    const completion = await this.openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: "Say this is a test.",
      max_tokens: 7,
      temperature: 0,
    });
  
    console.log(completion);
  }
}