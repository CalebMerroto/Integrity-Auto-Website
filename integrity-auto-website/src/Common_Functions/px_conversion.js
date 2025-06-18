function to_px(num) {
    return `${num}px`;
}

function from_px(px) {
    return parseInt(px.replace("px", "") || "0", 10);
}
