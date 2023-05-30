import { useEffect, useRef } from "react";

const usePrevios = value => {
  const ref = useRef();

  useEffect(()=>{
    ref.current = value;
  },[value])

  return ref.current;
}

export default usePrevios;