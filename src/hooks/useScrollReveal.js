import { useEffect, useRef, useState } from 'react';

export default function useScrollReveal() {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Un-observe if you only want the animation to happen once
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return [elementRef, isVisible];
}