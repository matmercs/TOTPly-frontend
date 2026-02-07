import React from 'react';
import { useLocation } from 'react-router-dom';

const getAbsoluteTop = (element: HTMLElement): number => {
  if (!element) {
    return 0;
  }
  return element.offsetTop + getAbsoluteTop(element.offsetParent as HTMLElement);
};

export const useScrollToSection = (headerId?: string) => {
  const location = useLocation();

  React.useEffect(() => {
    if (location.state?.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        if (headerId) {
          const header = document.getElementById(headerId);
          if (header) {
            const top = getAbsoluteTop(element) - header.offsetHeight;
            window.scrollTo({
              top,
              behavior: 'smooth',
            });
          }
        } else {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location, headerId]);
};
