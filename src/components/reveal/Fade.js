import React, { useState, useEffect, useRef } from 'react';

/**
 * Modern Fade component using Intersection Observer API
 * Replaces react-reveal Fade component to avoid deprecated lifecycle methods
 */
const Fade = ({ 
  children, 
  bottom = false, 
  top = false, 
  left = false, 
  right = false,
  duration = 1000,
  distance = '20px',
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
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
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

  // Determine animation direction
  let transformDirection = 'translateY(0)';
  if (bottom) transformDirection = `translateY(${distance})`;
  if (top) transformDirection = `translateY(-${distance})`;
  if (left) transformDirection = `translateX(-${distance})`;
  if (right) transformDirection = `translateX(${distance})`;

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) translateX(0)' : transformDirection,
    transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
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

export default Fade;

