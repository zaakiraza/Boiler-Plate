import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(AIzaSyDU6PmQqpnKJUg - jCBhTzwACU4LPse_pWE);

async function fileToGenerativePart(file) {
  const base64EncodedContent = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(",")[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: { data: base64EncodedContent, mimeType: file.type },
  };
}

async function analyzePDFWithGemini(
  pdfFile,
  prompt = "Analyze this PDF and provide a detailed summary"
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const generativePart = await fileToGenerativePart(pdfFile);

    const result = await model.generateContent([prompt, generativePart]);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error analyzing PDF with Gemini:", error);
    throw error;
  }
}

export { analyzePDFWithGemini };
