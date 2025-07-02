import { useEffect, useState } from "react";
import { fetchAllImages } from "../../../Common_Functions/api";
import "../Styles/Selection.css"
import Selectable from "./Selectable";



export default function ImageSelect({ id, setImg, onSelect, setName,setImageID }) {
    const [images, setImages] = useState([]);
    const [selection, setSelection] = useState(null);

    useEffect(() => {
        async function getImgs() {
            const data = await fetchAllImages();
            setImages(data ?? []);
            // console.log("Fetched images:", data);
        }
        getImgs();
    }, []);
    useEffect(()=>{
        setImg(selection)
    },[selection, setImg])

    useEffect(()=>{
        function handleKeyDown(e) {
            if (e.key === "Enter") {
                onSelect()
                setImg(selection)
            }
        }
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    })

    if (images.length === 0) {
        return <div>Loading images...</div>;
    }

    return (
        <div className="selectable-container">
            {images.map((img) => (
                <Selectable 
                    key={img.uuid}
                    uuid={img.uuid}
                    id={id}
                    selection={selection}
                    setSelection={setSelection}
                    size={75}
                    setName={setName}
                    setImageID={setImageID}
                />
            ))}
        </div>
    );
}

