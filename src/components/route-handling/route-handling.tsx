import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

export function RouteHandling(props: any) {

  const history = useHistory();
  useEffect(() => {
    const location = history.location;
    let hasScrolled = false;
    if (location.hash) {
      const element = document.getElementById(location.hash.split('#')[1]);
      if (element) {
        // Scroll to the element
        element.scrollIntoView({behavior: 'smooth'});
        hasScrolled = true;
      }
    }

    if (!hasScrolled) {
      window.scrollTo(0, 0);
    }
  });

  return props.children;
}
