import React, { useState, useEffect } from "react";
import "./App.css";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const [isTelegramWebView, setIsTelegramWebView] = useState(false);

  useEffect(() => {
    // Detect if devtools is open
    const detectDevTools = () => {
      const detect = setInterval(() => {
        const threshold = 160;
        const widthThreshold =
          window.outerWidth - window.innerWidth > threshold;
        const heightThreshold =
          window.outerHeight - window.innerHeight > threshold;

        let opened = false;
        const devtoolsCheck = () => {
          const start = performance.now();
          debugger;
          const duration = performance.now() - start;
          if (duration > 100) {
            opened = true;
          }
        };
        devtoolsCheck();

        if (widthThreshold || heightThreshold || opened) {
          setIsDevToolsOpen(true);
          clearInterval(detect);
        }
      }, 460);

      return () => clearInterval(detect);
    };

    detectDevTools();
  }, []);

  useEffect(() => {
    if (isDevToolsOpen === false) {
      const mobile = /Android|iPhone/i.test(navigator.userAgent);
      setIsMobile(mobile);
    }
  }, [isDevToolsOpen]);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      setIsTelegramWebView(true);
    }
  }, []);

  if (!isTelegramWebView || !isMobile) {
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
