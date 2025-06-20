// src/Components/common/SquareImage.jsx
import { useEffect, useState } from "react";
import { fetch_image } from "../../Common_Functions/api";
import "./Styles/ImageStyling.css"
import useCSSVar from "../../hooks/useCSSVar";

function SquareImage({ size = 100, uuid, src = null}) {

  const [image, setImage] = useState("/placeholder_square.png");
  const [, setCornerRad] = useCSSVar("corner-rad");



  useEffect(() => {
    async function loadImage() {
      if (src) {
        setImage(src)
      }
      else{
        try {
          const result = await fetch_image(uuid);
          console.log(`finding image at ${uuid}`)
          if (result) {
            setImage(result);
          }
          } catch {
            console.log("could not find image by uuid: ", uuid) 
          }
      }
    }
    loadImage();
  }, [uuid, setCornerRad, size, src]);

  
  const side = `${size}px`;
  return (
    <div 
      className="image-container std_border"
      style={{ width: side, height: side }}
    >
      
      <img
        src={src? src : image}
        alt="Square"
        className="pageImg"
        onError={() => setImage("/placeholder_square.png")}
      />
    </div>
  );
}

export default SquareImage;
