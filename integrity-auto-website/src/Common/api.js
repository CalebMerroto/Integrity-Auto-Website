const Base_URL = "http://localhost:3000/";



export async function upload_image(image, name, loc) {
  await fetch(`${Base_URL}/images/${name}/upload?locs=${loc}`, {
    method: "POST",
    headers: {
      "Content-Type": image.type,
    },
    body: image, // File or Blob
  });
}

export async function fetch_image(id) {
  return `${Base_URL}${id}`;
}
