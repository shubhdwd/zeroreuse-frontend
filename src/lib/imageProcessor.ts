// imageProcessor.ts
// This file is ONLY responsible for talking to the backend
// No UI logic, no fake processing, no frontend image manipulation

const API_URL = "https://zeroreuse-backend-2.onrender.com"; 
// ↑ replace with your actual Render backend URL
// example: https://zeroreuse-backend.onrender.com

type LogType = "info" | "success" | "warning" | "security";

export async function processImage(
  image: File,
  prompt: string,
  addLog: (msg: string, type: LogType) => void
) {
  if (!image) {
    throw new Error("No image provided");
  }

  addLog("Sending image to secure backend pipeline…", "info");

  const formData = new FormData();
  formData.append("image", image);
  formData.append("prompt", prompt);

  const response = await fetch(`${API_URL}/process`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Backend error:", text);
    throw new Error("Backend processing failed");
  }

  // ✅ IMPORTANT: force blob handling
  const blob = await response.blob();

  // 🔍 Debug (you can remove later)
  console.log("Blob size:", blob.size);
  console.log("Blob type:", blob.type);

  if (blob.size === 0) {
    throw new Error("Received empty image from backend");
  }

  const imageUrl = URL.createObjectURL(blob);

  addLog("Image successfully processed", "success");

  return {
    outputImage: imageUrl,
  };
}
