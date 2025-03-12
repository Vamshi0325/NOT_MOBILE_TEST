import React, { useState, useEffect } from "react";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(
    localStorage.getItem("devtools") === "open"
  );
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    // Function to detect DevTools open state
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
          setTimeout(() => {
            debugger; // If DevTools is open, execution time increases
            const duration = performance.now() - start;
            if (duration > 100) {
              opened = true;
              setIsDevToolsOpen(true);
              localStorage.setItem("devtools", "open"); // Store state
              clearInterval(detect);
            }
          }, 0);
        };
        devtoolsCheck();

        if (widthThreshold || heightThreshold || opened) {
          setIsDevToolsOpen(true);
          localStorage.setItem("devtools", "open"); // Store state
          clearInterval(detect);
        }
      }, 500);

      return () => clearInterval(detect); // Cleanup on unmount
    };

    detectDevTools();
  }, []);

  useEffect(() => {
    if (!isDevToolsOpen) {
      const mobile = /Android|iPhone/i.test(navigator.userAgent);
      setIsMobile(mobile);
    }
  }, [isDevToolsOpen]);

  // Ensure persistence across refresh if DevTools was open
  useEffect(() => {
    if (isDevToolsOpen) {
      localStorage.setItem("devtools", "open");
    }
  }, [isDevToolsOpen]);

  // If DevTools is open or it's not a mobile device, show NotMobileDevice
  if (isDevToolsOpen || isMobile === false) {
    return <NotMobileDevice />;
  }

  // Render UI only for mobile devices without DevTools open
  return (
    <div>
      <h1>Welcome to the Telegram Web App</h1>
      <p>This web app is linked to your Telegram bot.</p>
    </div>
  );
}

export default App;
