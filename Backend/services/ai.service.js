import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateResult = async (prompt) => {
  try {
    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while generating the response.";
  }
};
