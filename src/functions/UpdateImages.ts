export default async function uploadImages(e: any): Promise<string> {
  const files = e.target.files;
  const data = new FormData();
  data.append("file", files[0]);
  data.append("upload_preset", "images");
  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dbuykc0ea/image/upload",
    {
      method: "POST",
      body: data,
    }
  );
  const fileUpload = await res.json();

  return fileUpload.url;
}
