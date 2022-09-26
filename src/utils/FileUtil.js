export const getFile = async (image) => {
    const file =  await fetch(image.url)
    .then(r => r.blob())
    .then(blobFile => new File(
      [blobFile],
      image.name,
      { type: "image/png" }
      ));
    return file;
}

