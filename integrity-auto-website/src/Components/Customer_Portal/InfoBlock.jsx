// src/Components/Customer_Portal/Sub-Components/Info_Block.jsx
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import useCSSVar from "../../hooks/useCSSVar";
import { to_px, from_px } from "../../Common_Functions/px_conversion";
import useComponentID from "../../hooks/useComponentID";
import { getText } from "../../Common_Functions/api";

function InfoBlock({ w, h, p = 10, parentID}) {
  const {id} = useComponentID(parentID)
  const [text, setMdText] = useState("");

  const [padding, setPadding] = useCSSVar("sub-item-padding");
  const [, setCW] = useState(w - (p * 2));
  const [ch, setCH] = useState(h - (p * 2));

  // Set CSS variable for padding
  useEffect(() => {
    async function fetchText() {
      let tempText = await getText(id)
      setMdText(tempText.text)
    }
    setPadding(to_px(p));
    fetchText()
  }, [p, setPadding, setMdText, id]);

  // Calculate content width/height based on numeric padding
  useEffect(() => {
    const pad = from_px(padding)
    setCW(w - (pad * 2));
    setCH(h - (pad * 2));
    
  }, [w, h, padding]);


  return (
    <div style={{height: to_px(ch)}} className="centered-block" >
        <ReactMarkdown>{text || "_Click to edit markdown..._"}</ReactMarkdown>
    </div>
  );
}

export default InfoBlock;
