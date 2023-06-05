import { useEffect, useState } from "react";

const useOnline = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
  }, []);

  return isOnline;
};

export default useOnline;
