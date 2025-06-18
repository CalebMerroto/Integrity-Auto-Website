import { useCallback } from "react";

function useCSSVar(name) {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();

  const setVar = useCallback((val) => {
    document.documentElement.style.setProperty(`--${name}`, val);
  }, [name]);

  return [value, setVar];
}

export default useCSSVar;
