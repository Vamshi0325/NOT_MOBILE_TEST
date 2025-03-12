// import React, { useState, useEffect } from "react";
// import "./App.css";
// import NotMobileDevice from "./components/NotMobileDevice";

// function App() {
//   const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(null);

//   useEffect(() => {
//     if (window.Telegram && window.Telegram.WebApp) {
//       console.log("Telegram WebApp is available");
//       window.Telegram.WebApp.ready();
//       window.Telegram.WebApp.expand();
//     } else {
//       console.log("Telegram WebApp is not available");
//     }

//     // Function to detect DevTools
//     const detectDevTools = () => {
//       const widthThreshold = window.outerWidth - window.innerWidth > 160;
//       const heightThreshold = window.outerHeight - window.innerHeight > 160;

//       let devtoolsOpened = false;
//       const devtoolsCheck = () => {
//         const start = performance.now();
//         setTimeout(() => {
//           const duration = performance.now() - start;
//           if (duration > 100) {
//             devtoolsOpened = true;
//             setIsDevToolsOpen(true);
//             localStorage.setItem("devToolsOpen", "true");
//           }
//         }, 0);
//       };
//       devtoolsCheck();

//       if (widthThreshold || heightThreshold || devtoolsOpened) {
//         setIsDevToolsOpen(true);
//         localStorage.setItem("devToolsOpen", "true");
//       }
//     };

//     // **Immediate check on page load**
//     detectDevTools();

//     // **Run detection every 500ms**
//     const interval = setInterval(() => {
//       detectDevTools();

//       // If user manually deletes from localStorage, reapply block
//       if (!localStorage.getItem("devToolsOpen") && isDevToolsOpen) {
//         localStorage.setItem("devToolsOpen", "true");
//       }
//     }, 500);

//     // **Check localStorage on load**
//     if (localStorage.getItem("devToolsOpen") === "true") {
//       setIsDevToolsOpen(true);
//     }

//     // **Detect if the user is on a mobile device**
//     const mobile = /Android|iPhone/i.test(navigator.userAgent);
//     setIsMobile(mobile);

//     return () => clearInterval(interval);
//   }, [isDevToolsOpen]);

//   // If DevTools is open or it's not a mobile device, show <NotMobileDevice />
//   if (isDevToolsOpen || isMobile === false) {
//     return <NotMobileDevice />;
//   }

//   return (
//     <div style={{ textAlign: "center" }}>
//       <h1>Welcome to the Telegram Web App</h1>
//       <p>This web app is linked to your Telegram bot.</p>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import NotMobileDevice from "./components/NotMobileDevice";

function App() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      console.log("Telegram WebApp is available");
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    } else {
      console.log("Telegram WebApp is not available");
    }

    // Function to detect DevTools
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160;
      const heightThreshold = window.outerHeight - window.innerHeight > 160;

      let devtoolsOpened = false;
      const devtoolsCheck = () => {
        const start = performance.now();
        setTimeout(() => {
          const duration = performance.now() - start;
          if (duration > 100) {
            devtoolsOpened = true;
            setIsDevToolsOpen(true);
            try {
              localStorage.setItem("devToolsOpen", "true");
              sessionStorage.setItem("devToolsOpen", "true");
            } catch (error) {
              console.warn("Storage access blocked:", error);
            }
          }
        }, 0);
      };
      devtoolsCheck();

      if (widthThreshold || heightThreshold || devtoolsOpened) {
        setIsDevToolsOpen(true);
        try {
          localStorage.setItem("devToolsOpen", "true");
          sessionStorage.setItem("devToolsOpen", "true");
        } catch (error) {
          console.warn("Storage access blocked:", error);
        }
      }
    };

    // **Immediate check on page load**
    detectDevTools();

    // **Run detection every 500ms**
    const interval = setInterval(() => {
      detectDevTools();

      try {
        // If user removes from storage, reapply block
        if (
          !localStorage.getItem("devToolsOpen") &&
          !sessionStorage.getItem("devToolsOpen") &&
          isDevToolsOpen
        ) {
          localStorage.setItem("devToolsOpen", "true");
          sessionStorage.setItem("devToolsOpen", "true");
        }
      } catch (error) {
        console.warn("Storage access blocked:", error);
      }
    }, 500);

    // **Check storage on load**
    try {
      if (
        localStorage.getItem("devToolsOpen") === "true" ||
        sessionStorage.getItem("devToolsOpen") === "true"
      ) {
        setIsDevToolsOpen(true);
      }
    } catch (error) {
      console.warn("Storage access blocked:", error);
    }

    // **Detect if the user is on a mobile device**
    const mobile = /Android|iPhone/i.test(navigator.userAgent);
    setIsMobile(mobile);

    return () => clearInterval(interval);
  }, [isDevToolsOpen]);

  // If DevTools is open or it's not a mobile device, show <NotMobileDevice />
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
