
export const Base_URL = "http://localhost:5000/IntegrityAuto";



async function apiCall({ url, req, messages, returnType = "json" }) {
    try {
        // console.log(messages.start);
        const response = await fetch(`${Base_URL}${url}`, req);
        // console.log("response", response);

        if (!response.ok) {
            // console.error(`${messages.failed}: ${response.status}`);
            return null;
        }

        if (returnType === "json") {
            const data = await response.json();
            // console.log(messages.success, data);
            return data;
        } else if (returnType === "img") {
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);
            // console.log(messages.success, objectUrl);
            return objectUrl;
        }

        console.warn("[apiCall] Unknown returnType:", returnType);
        return null;
    } catch (error) {
        console.error(messages.error, error);
        return null;
    }
}


export async function check_config(name) {
    return apiCall({
        url: `/config/${name}`,
        req: {
            method: "GET",
        },
        messages: {
            start: `[check_config] Requesting config: ${name}`,
            failed: `[check_config] Failed to fetch config`,
            success: `[check_config] Config data:`,
            error: `[check_config] Error checking config:`,
        }
    });
}


export async function set_config(name, value) {
    let response = await apiCall({
        url: `/config/${name}/${value}`,
        req: {
            method: "POST",
        },
        messages: {
            start: `[set_config] Trying to create config: ${name} = ${value}`,
            failed: `[set_config] failed to create config`,
            success: `[set_config] Created config:`,
            error: `[set_config] Error setting config:`,
        }
    });

    if (!response) {
        response = await apiCall({
            url: `/config/${name}/${value}`,
            req: {
                method: "PUT",
            },
            messages: {
                start: `[set_config] Trying to update config: ${name} = ${value}`,
                failed: `Failed to update config`,
                success: `[set_config] Updated config:`,
                error: `[set_config] Error setting config:`,
            }
        });
    }

    return response;
}

export async function upload_image(file, name, loc) {
    if (!file) {
        console.log("Image Required");
        return false;
    }

    if (typeof name !== "string") {
        console.log("name must be a string", name);
        return false;
    }

    // Convert File → ArrayBuffer → Uint8Array
    const arrayBuffer = await file.arrayBuffer(); // browser API
    const buffer = new Uint8Array(arrayBuffer);   // compatible with express.raw()

    const result = await apiCall({
        url: `/images/${encodeURIComponent(name)}/upload?locs=${encodeURIComponent(loc ?? "")}`,
        req: {
            method: "POST",
            headers: {
                "Content-Type": file.type,
            },
            body: buffer, // Now sending raw binary
        },
        messages: {
            start: `[upload_image] Uploading image "${name}" to location "${loc}"`,
            failed: `[upload_image] Upload failed`,
            success: `[upload_image] Upload successful`,
            error: `[upload_image] Upload error`,
        },
    });

    return !!result;
}



export async function fetch_image(nameOrUUID) {
    if (!nameOrUUID) return
    return apiCall({
        url: `/images/${nameOrUUID}`,
        req: {
            method: "GET",
        },
        messages: {
            start: `[fetch_image] Fetching image "${nameOrUUID}"`,
            failed: `[fetch_image] Fetch failed`,
            success: `[fetch_image] Image retrieved`,
            error: `[fetch_image] Error fetching image`,
        },
        returnType: "img"
    });
}