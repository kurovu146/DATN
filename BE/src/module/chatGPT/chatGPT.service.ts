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

  async ChatGPT(content: string) {
    const completion = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content}],
    });
  
    return completion.choices[0].message.content;
  }
}