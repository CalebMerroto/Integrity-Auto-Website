// src/Components/Admin_Portal/Sub-Components/ImageUploadForm
import ButtonIcon from "./button_icon";
import { useEffect, useRef, useState } from "react";
import useCSSVar from "../../../hooks/useCSSVar";
import "../Styles/icon.css"
import { to_px } from "../../../Common_Functions/px_conversion";
import FileSizeDisplay from "../../common/FileSizeDisplay";

function UploadBox() {

  return (
    <div className="icon">
      <ButtonIcon btn="ArrowUpTrayIconOutline" />
    </div>
  );
}

function ImageUploadForm({scale, pad, img, setImg, onUploadSuccess, setFile, name, setName}) {
    const [, setSize] = useCSSVar("icon-size");
    const [, setPadding] = useCSSVar("icon-padding");
    const [isValidSize, setIsValidSize] = useState(true)

    const fileInputRef = useRef();

    useEffect(() => {
        setSize(to_px(scale));
        setPadding(to_px(pad));
    }, [scale, pad, setPadding, setSize, img]);

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader); // This will be a base64 image preview
            };
            reader.readAsDataURL(file);
            setFile(file)
        }
    }


    return (
        <>
            <div
                className={img == null ? "icon_container std_border centered-block" : "image_preview std_border centered-block"}
                onClick={() => fileInputRef.current?.click()}
                style={{marginRight: "30px"}}
            >
                <input
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
                {img == null ? (
                    <UploadBox/>
                ) : (
                    <img src={img.result} alt="Uploaded preview" className="image_preview"/>
                )}
            </div>
            <div className="image_upload_details">
                <span>Image Name: <input type="text" value={name} onChange={(e) => setName(e.target.value)} /></span>
                <div className="image_metadata_container">
                    <div>
                        <ul className="image_metadata">
                        <li>
                            <strong>File Name:</strong>{" "}
                            {fileInputRef.current?.files?.[0]?.name || "..."}
                        </li>
                        <li>
                            <strong>File Type:</strong>{" "}
                            {fileInputRef.current?.files?.[0]?.type || "..."}
                        </li>
                        <li>
                            <strong>File Size:</strong>{" "}
                            {fileInputRef.current?.files?.[0].size ?? <FileSizeDisplay size={fileInputRef.current?.files?.[0].size} isValidSize={isValidSize} setIsValidSize={setIsValidSize} />}
                        </li>
                        </ul>
                    </div>
                    <button 
                        className="upload_button"
                        onClick={onUploadSuccess}
                    >
                        Upload
                    </button>
                </div>

            </div>
        </>
    );
}

export default ImageUploadForm;
