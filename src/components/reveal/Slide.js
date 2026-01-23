import React, { useState, useEffect, useRef } from 'react';

/**
 * Modern Slide component using Intersection Observer API
 * Replaces react-reveal Slide component to avoid deprecated lifecycle methods
 */
const Slide = ({ 
  children, 
  bottom = false, 
  top = false, 
  left = false, 
  right = false,
  duration = 1000,
  distance = '100px',
  delay = 0,
  className = '',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback: show immediately if IntersectionObserver is not supported
      setIsVisible(true);
      setHasAnimated(true);
      return;
    }

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Add delay if specified
            setTimeout(() => {
              setIsVisible(true);
              setHasAnimated(true);
            }, delay);
            // Unobserve after animation to prevent re-triggering
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [delay, hasAnimated]);

  // Determine slide direction
  let transformDirection = 'translateX(0)';
  if (bottom) transformDirection = `translateY(${distance})`;
  if (top) transformDirection = `translateY(-${distance})`;
  if (left) transformDirection = `translateX(-${distance})`;
  if (right) transformDirection = `translateX(${distance})`;

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) translateX(0)' : transformDirection,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    willChange: hasAnimated ? 'auto' : 'opacity, transform'
  };

  return (
    <div
      ref={elementRef}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
};

export default Slide;

