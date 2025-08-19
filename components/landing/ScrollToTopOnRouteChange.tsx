import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTopOnRouteChange = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Immediate scroll, no smooth animation for page loads
    });
  }, [pathname]);

  return null;
};