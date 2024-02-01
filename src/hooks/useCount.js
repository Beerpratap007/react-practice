import { useEffect } from "react";
import { useState } from "react"

export const useCount = (counter) => {
    const [count, setCount] = useState(counter);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let interval;
      if(isRunning) {
        interval = setInterval(() => {
          setCount((prevCount) => prevCount === 5 ? 1 : prevCount+1);
          // setCount((prevCount) => {
          //   if (prevCount === 0) {
          //     setIsRunning(false);
          //     return 0;
          //   } else {
          //     return prevCount - 1;
          //   }
          // });
        }, 1000);
      }
      return () => clearInterval(interval);
    }, [isRunning]);

    const startCount = () => {
      setIsRunning(true);
    }

    const stopCount = () => {
      setIsRunning(false);
    }

    const resetCount = () => {
      setIsRunning(false);
      setCount(0);
    }

    return {count, isRunning, startCount, stopCount, resetCount};
}