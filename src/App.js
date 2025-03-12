import React, { useState, useEffect } from "react";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // Detect if DevTools is open
    const detectDevTools = () => {
      const threshold = 160;
      const detect = setInterval(() => {
        const widthThreshold =
          window.outerWidth - window.innerWidth > threshold;
        const heightThreshold =
          window.outerHeight - window.innerHeight > threshold;

        // Check for DevTools using debugger timing
        let opened = false;
        const devtoolsCheck = () => {
          const start = performance.now();
          debugger; // If DevTools is open, execution time increases
          const duration = performance.now() - start;
          if (duration > 100) {
            opened = true;
          }
        };
        devtoolsCheck();

        if (widthThreshold || heightThreshold || opened) {
          setIsDevToolsOpen(true);
          clearInterval(detect); // Stop checking once detected
        }
      }, 500);

      return () => clearInterval(detect); // Cleanup on unmount
    };

    detectDevTools();
  }, []);

  useEffect(() => {
    // Perform mobile check only after devtools check is complete
    if (isDevToolsOpen === false) {
      const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(mobile);
    }
  }, [isDevToolsOpen]);

  // Wait until checks are complete
  if (
    isDevToolsOpen === null ||
    (isDevToolsOpen === false && isMobile === null)
  ) {
    return null; // Prevent flicker by rendering nothing
  }

  // If DevTools are open or not on mobile, show the "Not Mobile" UI
  if (isDevToolsOpen || !isMobile) {
    return <NotMobileDevice />;
  }

  // Render actual Web App content if checks pass
  return (
    <div>
      <h1>Welcome to the Telegram Web App</h1>
      <p>This web app is linked to your Telegram bot.</p>
    </div>
  );
}

export default App;
