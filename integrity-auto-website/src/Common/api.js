const Base_URL = "http://localhost:3000/";

function fetch_image(id) {
  return `${Base_URL}${id}`;
}

export default fetch_image;
