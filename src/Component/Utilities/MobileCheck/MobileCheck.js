import React, { useEffect } from 'react';

function MobileCheck() {
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

    // if (isMobile) {
    //   // Redirect to a different page or display a message
    //   window.location.href = '/mobile-error-page'; // Redirect to an error page
    //   // OR
    //   // Display a message to the user indicating that the app is not available on mobile devices
    //   // You can render a message here or use a modal dialog.
    // }
  }, []);

  return <div></div>;
}

export default MobileCheck;
