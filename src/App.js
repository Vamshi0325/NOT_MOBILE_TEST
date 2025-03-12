import React, { useState, useEffect } from "react";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      let devtoolsOpened = false;
      const devtoolsCheck = () => {
        const start = performance.now();
        setTimeout(() => {
          debugger; // Execution delay if DevTools is open
          const duration = performance.now() - start;
          if (duration > 100) {
            devtoolsOpened = true;
          }
        }, 0);
      };
      devtoolsCheck();

      if (widthThreshold || heightThreshold || devtoolsOpened) {
        sessionStorage.setItem("devToolsOpen", "true"); // Prevent removal bypass
        setIsDevToolsOpen(true);
      }
    };

    // Run detection every 500ms
    const interval = setInterval(() => {
      detectDevTools();

      // If user removes sessionStorage, reapply the block
      if (!sessionStorage.getItem("devToolsOpen") && isDevToolsOpen) {
        sessionStorage.setItem("devToolsOpen", "true");
      }
    }, 500);

    // Check DevTools from previous session
    if (sessionStorage.getItem("devToolsOpen") === "true") {
      setIsDevToolsOpen(true);
    }

    // Detect mobile device
    const mobile = /Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(mobile);

    return () => clearInterval(interval);
  }, [isDevToolsOpen]);

  // Block UI if DevTools is open or device is not mobile
  if (isDevToolsOpen || isMobile === false) {
    return <NotMobileDevice />;
  }

  return (
    <div>
      <h1>Welcome to the Telegram Web App</h1>
      <p>This web app is linked to your Telegram bot.</p>
    </div>
  );
}

export default App;
