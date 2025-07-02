// src/Components/Admin_Portal/Sub-Components/ImageInput.jsx
import { useEffect, useState } from "react";
import SquareImage from "../common/SquareImage";
import useComponentID from "../../hooks/useComponentID";
import "../../Styles/ImageUpload.css"

function ImageBlock({ size, parentID}) {
    const fid = useComponentID(parentID)
    const [img, setImg] = useState(null);
    const id = fid.id


    useEffect(()=>{
        // console.log("img: ", img, `(${typeof(img)})`)
    },[img])
    return (
        <div className="image_input">
            <SquareImage 
                size={size} 
                parentID={fid}
                setImageId={setImg}
                ikey="comp"
            />
        </div>
    );
}

export default ImageBlock;
