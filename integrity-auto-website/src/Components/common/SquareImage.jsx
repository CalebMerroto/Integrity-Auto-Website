// src/Components/common/SquareImage.jsx
import { useEffect, useState } from "react";
import { fetch_image } from "../../Common_Functions/api";
import "./Styles/ImageStyling.css"
// import useCSSVar from "../../hooks/useCSSVar";
import useComponentID from "../../hooks/useComponentID";

function SquareImage({ size = 100, src = null, imageID = null, parentID = null, setImageId, ikey="comp", cssClass = "std_border"}) {
  const {id} = useComponentID(parentID)
  const [ image, setImage ] = useState("/placeholder_square.png");
  // const [ , setCornerRad] = useCSSVar("corner-rad");
  
  useEffect(() => {
    
    if (!imageID) {
      setImageId(id)
    }
    // console.log("image id:",id)
    async function loadImage() {
      if (src) {
        setImage(src)
      }
      else{
        try {
          const result = await fetch_image(imageID ?? id, ikey);
          // console.log(`finding image at ${imageID ?? id}`)
          if (result) {
            setImage(result);
          }
          } catch {
            console.log("could not find image by uuid: ", imageID ?? id) 
          }
      }
    }
    loadImage();
  }, [id, src, imageID, setImageId, ikey]);

  
  const side = `${size}px`;
  return (
    <div 
      className={`image-container ${cssClass}`}
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
