// src/Components/common/FileSizeDisplay.jsx
import { useEffect, useState } from "react";
import { check_config } from "../../Common_Functions/api";

function formatFileSize(size) {
    // console.log(size)
    if (isNaN(size)) return "...";

    const units = ["B", "KB", "MB", "GB", "TB"];
    let index = 0;

    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
}

function parseSizeString(sizeStr) {
    // Example: "5 MB" -> 5242880
    const units = { B: 1, KB: 1024, MB: 1024 ** 2, GB: 1024 ** 3, TB: 1024 ** 4 };

    const match = sizeStr.trim().match(/^(\d+(?:\.\d+)?)\s*(B|KB|MB|GB|TB)$/i);
    if (!match) return null;

    const [, numStr, unit] = match;
    const multiplier = units[unit.toUpperCase()];
    return parseFloat(numStr) * multiplier;
}

function FileSizeDisplay({ size, isValidSize, setIsValidSize }) {
    const [maxSizeBytes, setMaxSizeBytes] = useState(null);

    useEffect(() => {
        const initializeConfig = async () => {
            const config = await check_config("max_file_size");
            if (config?.value) {
                const maxBytes = parseSizeString(config.value);
                setMaxSizeBytes(maxBytes);
            }
        };

        initializeConfig();
    }, []);

    useEffect(() => {
        if (maxSizeBytes !== null && size !== undefined && size !== null) {
            setIsValidSize(size <= maxSizeBytes);
        }
    }, [size, maxSizeBytes, setIsValidSize]);

    return (
        <span className={size ? isValidSize ? "valid_file_size" : "invalid_file_size" : ""}>
            {size ? formatFileSize(size) : "..."}
        </span>
    );
}

export default FileSizeDisplay;
