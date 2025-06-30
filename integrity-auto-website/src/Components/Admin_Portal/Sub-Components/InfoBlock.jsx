// src/Components/Admin_Portal/Sub-Components/Info_Block.jsx
import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import useCSSVar from "../../../hooks/useCSSVar";
import { to_px, from_px } from "../../../Common_Functions/px_conversion";

function InfoBlock({ w, h, p = 10, }) {
  const [text, setText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const [padding, setPadding] = useCSSVar("sub-item-padding");
  const [cw, setCW] = useState(w - (p * 2));
  const [ch, setCH] = useState(h - (p * 2));

  // Set CSS variable for padding
  useEffect(() => {
    setPadding(to_px(p));
  }, [p, setPadding]);

  // Calculate content width/height based on numeric padding
  useEffect(() => {
    const pad = from_px(padding)
    setCW(w - (pad * 2));
    setCH(h - (pad * 2));
    
  }, [w, h, padding]);

  function handleFocusOn() {
    setIsEditing(true);
  }

  function handleFocusOff(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsEditing(false);
    }
  }

  return (
    <div 
      onBlur={handleFocusOff} 
      tabIndex={-1} 
      className="pageItem std_border"

    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={text}
          autoFocus
          onChange={(e) => setText(e.target.value)}
          className=""
          style={{ width: to_px(cw), height: to_px(ch) }}
          onFocus={handleFocusOn}
        />
      ) : (
        <div
          onClick={() => setIsEditing(true)}
          style={{
            cursor: "pointer", 
            height: to_px(ch),
          }}
          className=""
        >
          <ReactMarkdown>{text || "_Click to edit markdown..._"}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default InfoBlock;
