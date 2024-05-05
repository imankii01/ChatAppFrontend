import { useState, useEffect } from 'react';

export function IsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches); // Change the value based on your mobile breakpoint
    }

    handleResize(); // Call the function initially to set the correct value

    window.addEventListener('resize', handleResize); // Add event listener to handle screen size changes

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up the event listener on component unmount
    };
  }, []);

  return isMobile;
}

