// src/Components/Admin_Portal/Sub-Components/ImageInput.jsx
import { useEffect, useState } from "react";
import SquareImage from "../../common/SquareImage";
import ImageUploadForm from "./ImageUploadForm";
import Modal from "../../common/Modal";
import { upload_image } from "../../../Common_Functions/api";
import useComponentID from "../../../hooks/useComponentID";
import "../Styles/ImageUpload.css"

function ImageInput({ size, image, parentID}) {
    const fid = useComponentID(parentID)
    const [img, setImg] = useState(null);
    const [file,setFile] = useState(null)
    const [name, setName] = useState("")
    const [showDialog, setShowDialog] = useState(false);
    const [imageID, setImageID] = useState(false);
    // console.log("Image Input",parentID,fid)
    const id = fid.id

    function handleSetImage() {
        setShowDialog(true);
    }

    function handleClose() {
        setShowDialog(false);
    }

    async function handleImageUploaded() {
        setShowDialog(false);
        // const result = null
        const result = await upload_image(file, name, imageID);
        if (!result) {
            setImg(null)
            setName("")
        }
        
    }

  useEffect(()=>{},[img])
  return (
    <>
        <div className="image_input" onClick={handleSetImage}>
            <SquareImage 
                size={size} 
                src={img ? img.result : null} 
                image={image}  
                parentID={fid}
                setImageId={setImageID}
            />
        </div>

        {showDialog && (
            <Modal>
                <ImageUploadForm 
                    img={img}
                    setImg={setImg}
                    onClose={handleClose}
                    onUploadSuccess={handleImageUploaded}
                    setName={setName}
                    setFile={setFile}
                    name={name}
                    scale={50}
                    pad={25}
                />
            </Modal>
        )}
        </>
    );
}

export default ImageInput;
