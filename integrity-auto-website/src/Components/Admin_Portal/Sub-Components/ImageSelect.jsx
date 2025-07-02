import { useEffect, useState } from "react";
import { fetch_image_data, fetchAllImages } from "../../../Common_Functions/api";
import SquareImage from "../../common/SquareImage";

function ImageIcon({uuid, id, setImageId}){
    const [meta, setMeta] = useState({name:""})

    useEffect(() => {
        async function fetchMeta() {
            const data = await fetch_image_data(uuid, "id");
            setMeta(data);
            // console.log("meta",data)
        }
        fetchMeta();

    }, [uuid]);

    return (
        <div>
            <SquareImage
                imageID={uuid}
                parentID={id}
                setImageId={setImageId}
                ikey="id"
            />
            <span>
                {meta?.name}
            </span>
        </div>
    )
}
export default function ImageSelect({ id }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function getImgs() {
      const data = await fetchAllImages();
      setImages(data ?? []); // always an array
      console.log("Fetched images:", data);
    }
    getImgs();
  }, []);

  if (images.length === 0) {
    return <div>Loading images...</div>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {images.map((img) => (
        <ImageIcon 
          key={img.uuid}
          uuid={img.uuid}
          id={id}
          setImageId={() => {}}
        />
      ))}
    </div>
  );
}
