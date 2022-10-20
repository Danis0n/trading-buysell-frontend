import superImage from "./Image";

export const getFile = async (image) => {
  const file =  await fetch(image.url)
  .then(r => r.blob())
  .then(blobFile => new superImage(
    new File(
      [blobFile],
      image.name,
      { type: "image/png" }
      ),image.url));
  return file;
}

