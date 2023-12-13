import { useEffect, useRef } from "react";

const useClickOutside = (callback, excludeRef) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        excludeRef?.current?.contains?.(event.target) !== true
      ) {
        console.log("yoyoy");
        callback();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [callback, excludeRef]);

  return ref;
};

export default useClickOutside;
