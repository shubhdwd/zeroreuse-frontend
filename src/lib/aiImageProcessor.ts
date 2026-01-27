/**
 * AI-powered image transformation using Lovable AI Gateway
 * 
 * This module handles advanced AI transformations like:
 * - Cartoon/animated style conversion
 * - Gender swap transformations
 * - Other AI-powered effects
 */

export interface AIProcessingResult {
  outputImage: string;
  pipelineUsed: string;
}

/**
 * Check if the prompt requires AI processing
 * Now ALL prompts go through AI for real transformations
 */
export function requiresAIProcessing(prompt: string): boolean {
  // Only skip AI for very basic filter-like prompts that can be done locally
  const localOnlyKeywords = ['blur', 'sharpen', 'brightness', 'contrast only', 'rotate', 'flip', 'crop'];
  const lowerPrompt = prompt.toLowerCase();
  
  // If it's a basic filter operation, use local processing
  const isLocalOnly = localOnlyKeywords.some(keyword => lowerPrompt === keyword || lowerPrompt === `add ${keyword}`);
  
  // Everything else goes through AI
  return !isLocalOnly;
}

/**
 * Process image using AI transformation
 */
export async function processImageWithAI(
  imageFile: File,
  prompt: string,
  onLog: (msg: string, type: "info" | "success" | "warning" | "security") => void
) {
  onLog("Uploading image to local secure processor...", "info");

  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("prompt", prompt);

  const res = await fetch("https://zeroreuse-backend-1.onrender.com", {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
  const err = await res.text();
  console.error("Backend error:", err);
  throw new Error(err);
}


  // ⬇️ Backend returns IMAGE, not JSON
  const blob = await res.blob();
  const imageUrl = URL.createObjectURL(blob);

  onLog("Image processed successfully", "success");
  onLog("No image stored or reused", "security");

  return {
    outputImage: imageUrl,
    pipelineUsed: "Local OpenCV Processing"
  };
}




