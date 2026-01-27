export async function processImage(
  image: File,
  prompt: string,
  addLog: Function
) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("prompt", prompt);

  const res = await fetch("https://zeroreuse-backend-1.onrender.com", {
    method: "POST",
    body: formData,
  });

  const blob = await res.blob();
  return {
    outputImage: URL.createObjectURL(blob),
  };
}
