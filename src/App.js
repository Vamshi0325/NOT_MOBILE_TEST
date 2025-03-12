import React, { useState, useEffect } from "react";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isMobile, setIsMobile] = useState(null);
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);

  useEffect(() => {
    // Detect if the device is mobile (Android/iPhone)
    const mobileCheck = () => {
      const isMobileDevice = /Android|iPhone/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
    };

    // Detect if Developer Tools is open
    const detectDevTools = () => {
      const threshold = 160;
      const checkDevTools = () => {
        const widthThreshold =
          window.outerWidth - window.innerWidth > threshold;
        const heightThreshold =
          window.outerHeight - window.innerHeight > threshold;

        let devToolsOpened = false;

        // Debugger detection - Delays execution if DevTools is open
        const devtoolsCheck = () => {
          const start = performance.now();
          debugger; // If DevTools is open, execution time increases
          const duration = performance.now() - start;
          if (duration > 100) {
            devToolsOpened = true;
          }
        };
        devtoolsCheck();

        if (widthThreshold || heightThreshold || devToolsOpened) {
          setIsDevToolsOpen(true);
        }
      };

      // Run detection every 500ms
      const interval = setInterval(checkDevTools, 500);

      return () => clearInterval(interval);
    };

    mobileCheck();
    detectDevTools();
  }, []);

  // If DevTools is open or not a mobile device, show NotMobileDevice
  if (isDevToolsOpen || isMobile === false) {
    return <NotMobileDevice />;
  }

  // Render the Web App UI only on a mobile device and if DevTools is closed
  return (
    <>
      {isMobile && !isDevToolsOpen && (
        <div>
          <h1>Welcome to the Telegram Web App</h1>
          <p>This web app is linked to your Telegram bot.</p>
        </div>
      )}
    </>
  );
}

export default App;
