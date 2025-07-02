// src/Components/Admin_Portal/Sub-Components/ImageInput.jsx
import { useEffect, useState } from "react";
import SquareImage from "../../common/SquareImage";
import ImageUploadForm from "./ImageUploadForm";
import Modal from "../../common/Modal";
import { select_image, upload_image } from "../../../Common_Functions/api";
import useComponentID from "../../../hooks/useComponentID";
import "../Styles/ImageUpload.css"
import ImageSelect from "./ImageSelect";

function ImageInput({ size, image, parentID}) {
    const fid = useComponentID(parentID)
    const [img, setImg] = useState(null);
    const [file,setFile] = useState(null)
    const [name, setName] = useState("")
    const [mode, setMode] = useState(true)
    const [showDialog, setShowDialog] = useState(false);
    const [imageID, setImageID] = useState(null);
    // console.log("Image Input",parentID,fid)
    // const id = fid.id

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
    async function handleImageSelect() {
        setShowDialog(false);
        // const result = null
        if (!img) return 
        const result = await select_image(img,imageID);
        if (!result) {
            setImg(null)
            setName("")
        }
        
    }

    useEffect(()=>{
        // console.log("img: ", img, `(${typeof(img)})`)
    },[img])
    return (
        <>
            <div className="image_input" onClick={handleSetImage}>
                <SquareImage 
                    size={size} 
                    src={typeof(img) === "string" ? null : img?.result} 
                    image={image}
                    imageID={typeof(img) === "string" ? img : null}  
                    parentID={fid}
                    setImageId={setImageID}
                    ikey={typeof(img) === "string" ? "id" : "comp"}
                />
            </div>

            {showDialog && (
                <Modal onClose={handleClose}  >
                    <div className="image_upload_form std_border" style={{borderRadius:25}}>
                        <div>
                            <button onClick={()=>{setMode(true)}}>
                                Upload
                            </button>
                            <button onClick={()=>{setMode(false)}}>
                                Select
                            </button>
                        </div>
                        {mode ? ( 
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
                            /> ):(
                            <ImageSelect 
                                id={fid} 
                                onSelect={handleImageSelect} 
                                setImg={setImg} 
                                setName={setName}
                                setImageID={setImageID}
                            />
                            )}
                    </div>

                </Modal>
            )}
        </>
    );
}

export default ImageInput;
