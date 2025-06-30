// src/hooks/useComponentID.js
import { useMemo } from "react";
import { getNextId, clearIDs, idExists, CreateId } from "../Common_Functions/api";
const idCounters = new Map();          // parentID → nextChildIndex
const initializedPages = new Set();    // Tracks which pages have been reset

export default function useComponentID({pageName, parentID = null, id = null}) {
  if (!parentID && id) {
    parentID = id
  }
  return useMemo(() => {
    let exists = idExists(pageName)
    const isTopLevel = parentID === null || parentID === pageName;
    if (!parentID) {
      parentID = pageName
    }
    if (isTopLevel && !exists) {
      console.log("page does not exist")
      CreateId(pageName)
    }

    const parentKey = parentID ?? pageName;
    const count = idCounters.get(parentKey) ?? 0;
    idCounters.set(parentKey, count + 1);

    const id = parentID
      ? `${parentID}-${String(count).padStart(3, "0")}`
      : `${pageName}-${String(count).padStart(3, "0")}`;
    if (!idExists(id)){
      console.log("creating",id)
      CreateId(id)
    }
    return {pageName, id};
  }, [pageName, parentID]);
}
