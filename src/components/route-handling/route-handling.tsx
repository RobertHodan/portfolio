import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

export function RouteHandling(props: any) {

  const history = useHistory();
  useEffect(() => {
    const location = history.location;
    window.scrollTo(0, 0);
    if (location.hash) {
      const element = document.getElementById(location.hash.split('#')[1]);
      if (element) {
        // Scroll to the element
        element.scrollIntoView();
      }
    }
  });
  console.log('rawr')

  return props.children;
}
