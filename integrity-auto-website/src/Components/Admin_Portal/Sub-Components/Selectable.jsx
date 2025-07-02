import { useEffect, useState } from "react";
import SquareImage from "../../common/SquareImage";
import { fetch_image_data } from "../../../Common_Functions/api";


export default function Selectable({ uuid, id, selection, setSelection, size = 50, setName, setImageID }) {
    const [meta, setMeta] = useState({ name: "" });

    useEffect(() => {
        async function fetchMeta() {
        const data = await fetch_image_data(uuid, "id");
        setMeta(data);
        }
        fetchMeta();
    }, [uuid]);

    function toggle() {
        if (selection !== uuid) {
            setSelection(uuid);
            setName(meta?.name)
        }
        else {
            setSelection(null)
            setName("")
        }
    }

    const isSelected = selection === uuid;

    return (
        <div
            style={{ width: `${size}px` }}
            onClick={toggle}
        >
            <SquareImage
                cssClass={`selectable${isSelected ? " selected" : " std_border"}`}
                size={size}
                imageID={uuid}
                parentID={id}
                setImageId={setImageID}
                ikey="id"
            />
            <span>
                {meta?.name}
            </span>
        </div>
    );
}