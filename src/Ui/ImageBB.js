export const ImageBB = async (file ) => {
  console.log(file);
  if (!file) throw new Error("File is required");
  const formData = new FormData();
  formData.append("image", file);
  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
    {
      method: "POST",
      body: formData,
    },
  );
  console.log('response',response.status);

  const data = await response.json();

console.log('data',data);
  if (!response.ok) throw new Error(data.error || "Failed to upload image");
  return data.data.url;
};

export default ImageBB;
