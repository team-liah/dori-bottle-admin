import { useEffect, useRef } from "react";

export default function useIntersectionObserver(callback: () => void) {
  const observer = useRef<IntersectionObserver>();

  useEffect(() => {
    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [callback]);

  const observe = (element: Element) => {
    observer.current?.observe(element);
  };

  const unobserve = (element: Element) => {
    observer.current?.unobserve(element);
  };

  return [observe, unobserve];
}
