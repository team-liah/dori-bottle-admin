import { useEffect, useState } from "react";

const useDeviceDetect = () => {
  const [isMobile, setMobile] = useState(false);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = Boolean(userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i));
    const ios = Boolean(userAgent.match(/iPad|iPhone|iPod/i));
    setMobile(mobile);
    setIsIos(ios);
  }, []);

  return { isMobile, isIos };
};

export default useDeviceDetect;
