
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

export async function upload_image(file, name, id) {
    console.log("uploading image at:", name, id)
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
        url: `/images/upload/${name}/${id}`,
        req: {
            method: "POST",
            headers: {
                "Content-Type": file.type,
            },
            body: buffer, // Now sending raw binary
        },
        messages: {
            start: `[upload_image] Uploading image "${name}"`,
            failed: `[upload_image] Upload failed`,
            success: `[upload_image] Upload successful`,
            error: `[upload_image] Upload error`,
        },
    });

    return !!result;
}

export async function select_image(imageID, componentID) {
    return await apiCall({
        url: `/images/usage/${componentID}/${imageID}`,
        req: {
            method: "POST"
        }
    })
}

export async function fetch_image(id, key = "comp") {
    if (!id) return
    return apiCall({
        url: `/images/byKey/${key}/${id}`,
        req: {
            method: "GET",
        },
        messages: {
            start: `[fetch_image] Fetching image "${id}"`,
            failed: `[fetch_image] Fetch failed`,
            success: `[fetch_image] Image retrieved`,
            error: `[fetch_image] Error fetching image`,
        },
        returnType: "img"
    });
}

export async function fetch_image_data(id, key = "comp") {
    if (!id) return
    return apiCall({
        url: `/images/meta/id/${id}`,
        req: {
            method: "GET",
        },
        messages: {
            start: `[fetch_image] Fetching image "${id}"`,
            failed: `[fetch_image] Fetch failed`,
            success: `[fetch_image] Image retrieved`,
            error: `[fetch_image] Error fetching image`,
        }
    });
}
export async function fetchAllImages() {
    return await apiCall({
        url: `/images/all/date/asc`
    })
    
}
export async function setText(uuid, text) {
  if (!uuid || typeof text !== "string") {
    console.error("[setText] Invalid arguments");
    return false;
  }

  const response = await apiCall({
    url: `/text/${uuid}`,
    req: {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text })
    },
    messages: {
      start: `[setText] Trying to upsert text: ${uuid}`,
      failed: `[setText] Upsert failed`,
      success: `[setText] Text upserted:`,
      error: `[setText] Error upserting text:`
    }
  });

  console.log("SetText response:", response);
  return response?.text;
}

export async function getText(uuid) {
    if (!uuid) {
        console.error("[getText] No UUID provided");
        return null;
    }

    return apiCall({
        url: `/text/${uuid}`,
        req: {
            method: "GET",
        },
        messages: {
            start: `[getText] Fetching text for "${uuid}"`,
            failed: `[getText] Fetch failed`,
            success: `[getText] Text fetched:`,
            error: `[getText] Error fetching text`,
        }
    });
}
export async function getNextId(id) {
    if (!id) {
        console.error("[getNextId] no ID provided")
    }
    return apiCall({
        url:`/id/next/${id}`,
        req:{
            method: "POST",
        },
        messages: {
            start: `[getNextId] fetching next Id`,
            failed: `[getNextId] Fetch failed`,
            success: `[getNextId] id fetched:`,
            error: `[getNextId] Error fetching next id`
        }
    })
}
export async function CreateId(id) {
    if (!id) {
        console.error("[CreateId] no ID provided", id)
    }
    return apiCall({
        url:`/id/create/${id}`,
        req:{
            method: "POST",
        },
        messages: {
            start: `[CreateId] Creating New ID`,
            failed: `[CreateId] Creation failed`,
            success: `[CreateId] id created:`,
            error: `[CreateId] Error creating id`
        }
    })
}
export async function idExists(id) {
    if (!id || id === "undefined") {
        return false;
    }

    const result = await apiCall({
        url: `/id/exists/${id}`,
        req: {
            method: "GET"
        },
        messages: {
            start: `[idExists] Checking if ID exists`,
            failed: `[idExists] Could not verify existence`,
            success: `[idExists] Existence verified:`,
            error: `[idExists] Error verifying existence`
        }
    });
    // console.log("result", result)
    // console.log("exists", result?.exists ?? false)
    // Defensive: result may be null
    return result?.exists ?? false;
}
export async function clearIDs() {
    return apiCall({
        url:`/id/clear`,
        req: {
            method: "POST"
        },
        messages: {
            start: `[clearIDs] clearing IDs`,
            failed: `[clearIDs] could not clear IDs`,
            success: `[clearIDs] IDs Cleared:`,
            error: `[clearIDs] Error clearing IDs`
        }
    })
}

// Service related calls
export async function getServicesForDay(dayStr) {
    return apiCall({
        url: `services/all/onDay/${dayStr}`,
        req: { method: "GET" },
        messages: {
            start: `[getServicesForDay] Getting services for ${dayStr}`,
            failed: `[getServicesForDay] Failed to get services`,
            success: `[getServicesForDay] Services fetched:`,
            error: `[getServicesForDay] Error fetching services for ${dayStr}`
        }
    });
}
export async function checkAvailability(dayStr) {
    return apiCall({
        url: `services/availability/${dayStr}`,
        req: { method: "GET" },
        messages: {
            start: `[checkAvailability] Checking availability for ${dayStr}`,
            failed: `[checkAvailability] Failed to check availability`,
            success: `[checkAvailability] Availability status received:`,
            error: `[checkAvailability] Error checking availability for ${dayStr}`
        }
    });
}
export async function createService(dayStr, serviceData) {
    return apiCall({
        url: `services/new/onDay/${dayStr}`,
        req: {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(serviceData)
        },
        messages: {
            start: `[createService] Creating service for ${dayStr}`,
            failed: `[createService] Failed to create service`,
            success: `[createService] Service created:`,
            error: `[createService] Error creating service for ${dayStr}`
        }
    });
}
export async function markServiceComplete(license, dayStr) {
    return apiCall({
        url: `services/complete/${license}/${dayStr}`,
        req: { method: "POST" },
        messages: {
            start: `[markServiceComplete] Marking ${license} as complete on ${dayStr}`,
            failed: `[markServiceComplete] Failed to mark complete`,
            success: `[markServiceComplete] Service marked complete`,
            error: `[markServiceComplete] Error marking service complete`
        }
    });
}
export async function rescheduleService(license, newDayStr) {
    return apiCall({
        url: `services/reschedule/${license}/${newDayStr}`,
        req: { method: "PUT" },
        messages: {
            start: `[rescheduleService] Rescheduling ${license} to ${newDayStr}`,
            failed: `[rescheduleService] Failed to reschedule service`,
            success: `[rescheduleService] Service rescheduled:`,
            error: `[rescheduleService] Error rescheduling service`
        }
    });
}
export async function cancelService(license, dayStr) {
    return apiCall({
        url: `services/cancel/${license}/${dayStr}`,
        req: { method: "POST" },
        messages: {
            start: `[cancelService] Cancelling service for ${license} on ${dayStr}`,
            failed: `[cancelService] Failed to cancel service`,
            success: `[cancelService] Service cancelled`,
            error: `[cancelService] Error cancelling service`
        }
    });
}
export async function overrideFullStatus(dayStr) {
    return apiCall({
        url: `services/override/fullStatus/${dayStr}`,
        req: { method: "PUT" },
        messages: {
            start: `[overrideFullStatus] Overriding full status for ${dayStr}`,
            failed: `[overrideFullStatus] Failed to override full status`,
            success: `[overrideFullStatus] Full status overridden`,
            error: `[overrideFullStatus] Error overriding full status`
        }
    });
}
