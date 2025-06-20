// src/Components/Admin_Portal/ImageInput.jsx
import { useEffect, useState } from "react";
import SquareImage from "../common/SquareImage";
import ImageUploadForm from "./ImageUploadForm";
import Modal from "../common/Modal";
import { upload_image } from "../../Common_Functions/api";

function ImageInput({ size, uuid }) {
    const [img, setImg] = useState(null);
    const [file,setFile] = useState(null)
    const [name, setName] = useState("")
    const [showDialog, setShowDialog] = useState(false);

    function handleSetImage() {
        setShowDialog(true);
    }

    function handleClose() {
        setShowDialog(false);
    }

    async function handleImageUploaded() {
        setShowDialog(false);
        // const result = null
        const result = await upload_image(file, name, []);
        if (!result) {
            setImg(null)
            setName("")
        }
        
    }

  useEffect(()=>{},[img])
  return (
    <>
        <div className="image_input" onClick={handleSetImage}>
            <SquareImage size={size} src={img ? img.result : null} uuid={uuid} />
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
