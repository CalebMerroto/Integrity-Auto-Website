import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import useCSSVar from "../../hooks/useCSSVar";

function InfoBlock({w,h}) {
    const [text, setText] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const textareaRef = useRef(null);
    const [padding, setPadding] = useCSSVar("sub-item-padding")

    function handleFocusOn() {
        setIsEditing(true);
    }

    function handleFocusOff(e) {
        // Only exit edit mode if blur wasn't from clicking inside the textarea
        if (!e.currentTarget.contains(e.relatedTarget)) {
        setIsEditing(false);
        }
    }
    const numericPadding = from_px(padding);
    const contentWidth = w - numericPadding * 2;
    const contentHeight = h - numericPadding * 2;
    return (
        <div
            onBlur={handleFocusOff}
            tabIndex={-1}
            className="pageItem"
        >
            {isEditing ? (
                    <textarea
                        ref={textareaRef}
                        value={text}
                        autoFocus
                        onChange={(e) => setText(e.target.value)}
                        className="pageSubItem"
                        style={{ width: `${contentWidth}px`, height: `${contentHeight}px` }}
                        onFocus={handleFocusOn}
                    />
            ) : (
                <div 
                    onClick={() => setIsEditing(true)}
                    style={{ cursor: "pointer", width: `${contentWidth}px`, height: `${contentHeight}px` }}
                    className="pageSubItem"
                >
                    <ReactMarkdown>{text || "_Click to edit markdown..._"}</ReactMarkdown>
                </div>
            )}
        </div>
    );
}

export default InfoBlock;
