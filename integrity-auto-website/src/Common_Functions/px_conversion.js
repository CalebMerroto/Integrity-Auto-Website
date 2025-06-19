// src/Common_Functions/px_conversion.js
export function to_px(num) {
  return `${num}px`;
}

export function from_px(px) {
  if (typeof px !== "string") {
    console.warn("from_px called with non-string:", px);
    return 0;
  }
  return parseInt(px.replace("px", ""), 10) || 0;
}
