import React, { useState, useEffect } from "react";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  // Function to detect if DevTools is open
  const detectDevTools = () => {
    // Detects if window size is manipulated (DevTools side panel opened)
    const widthThreshold = window.outerWidth - window.innerWidth > 160;
    const heightThreshold = window.outerHeight - window.innerHeight > 160;

    // Debugger detection trick
    let opened = false;
    const devtoolsCheck = () => {
      const start = performance.now();
      setTimeout(() => {
        debugger; // Execution takes longer if DevTools is open
        const duration = performance.now() - start;
        if (duration > 100) {
          opened = true;
          setIsDevToolsOpen(true);
        }
      }, 0);
    };
    devtoolsCheck();

    if (widthThreshold || heightThreshold || opened) {
      setIsDevToolsOpen(true);
    }
  };

  useEffect(() => {
    // Check DevTools status every 500ms
    const interval = setInterval(detectDevTools, 500);

    // Detect if the device is mobile
    const mobile = /Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(mobile);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  // If DevTools is open or it's not a mobile device, show NotMobileDevice
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
