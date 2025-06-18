import { useEffect, useState } from "react";
import fetch_image from "../../Common/api";
import EditButton from "./Edit_button"; 
import "./square_image.css"
import useCSSVar from "../../hooks/useCSSVar";

function SquareImage({ size = 100, corner_rad = 8, uuid }) {

  const [image, setImage] = useState("/placeholder_square.png");
  const [, setWidth] = useCSSVar("width");
  const [, setHeight] = useCSSVar("height");
  const [, setCornerRad] = useCSSVar("corner-rad");


  function handleSetImage(){

  }

  useEffect(() => {
    async function loadImage() {
      const result = await fetch_image(uuid || "/placeholder_square.png");
      setImage(result);
    }
    loadImage();
  }, [uuid]);

  setHeight(to_px(size))
  setWidth(to_px(size))
  setCornerRad(to_px(corner_rad))
  
  return (
    <div className="img-container">
      
    <div className="icon">
        <EditButton btn="UploadImage" click={handleSetImage}/>
    </div>
      

      <img
        src={image}
        alt="Square"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        onError={() => setImage("/placeholder_square.png")}
      />
    </div>
  );
}

export default SquareImage;
