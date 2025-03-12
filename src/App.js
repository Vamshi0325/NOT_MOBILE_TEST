import React, { useState, useEffect } from "react";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isAllowed, setIsAllowed] = useState(null); // Use null to track loading state

  useEffect(() => {
    const checkTelegramWebApp = () => {
      if (typeof window.Telegram !== "undefined" && window.Telegram.WebApp) {
        // Ensure it's a mobile device
        const isMobile = /Android|iPhone/i.test(navigator.userAgent);

        if (isMobile) {
          setIsAllowed(true); // Allow access
        } else {
          setIsAllowed(false); // Block if not mobile
        }
      } else {
        setIsAllowed(false); // Block if Telegram WebApp is unavailable
      }
    };

    // Wait until Telegram script is loaded
    const interval = setInterval(() => {
      if (typeof window.Telegram !== "undefined") {
        clearInterval(interval);
        checkTelegramWebApp();
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  if (isAllowed === null) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
        Loading...
      </div>
    ); // Show loading state
  }

  if (!isAllowed) {
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
