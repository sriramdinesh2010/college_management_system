import { useState, useEffect } from "react";

const usePersist = (): [
  boolean,
  (value: boolean | ((prev: boolean) => boolean)) => void
] => {
  const [persist, setPersist] = useState<boolean>(() => {
    const saved = localStorage.getItem("persist");
    return saved !== null ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("persist", JSON.stringify(persist));
  }, [persist]);

  const setPersistValue = (value: boolean | ((prev: boolean) => boolean)) => {
    if (typeof value === "function") {
      setPersist((prev) => (value as (prev: boolean) => boolean)(prev));
    } else {
      setPersist(value);
    }
  };

  return [persist, setPersistValue];
};

export default usePersist;
