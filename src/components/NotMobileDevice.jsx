import React from "react";
import notFound404 from "./NotFound404.png";

const NotMobileDevice = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to bottom, #000428, #004e92)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        padding: "10px",
      }}
    >
      <img
        src={notFound404}
        alt=""
        style={{
          maxWidth: "70vw",
          height: "150px",
          objectFit: "contain",
        }}
      />
      <h1
        style={{
          fontWeight: "bold",
          color: "white",
          textAlign: "center",
          marginTop: "6px",
          opacity: 1,
          backgroundImage:
            "linear-gradient(to right, #eedd44, #f32170, #ff6b08, #cf23cf, #eedd44)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          animation: "shine 3s linear infinite",
          filter: "drop-shadow(black 2px 2px 10px)",
        }}
      >
        @TEST BOT 6
      </h1>
      <style>
        {`
          @-webkit-keyframes shine {
            0% { background-position: 100%; }
            100% { background-position: -100%; }
          }
          @keyframes shine {
            0% { background-position: 100%; }
            100% { background-position: -100%; }
          }
        `}
      </style>
      <h3
        style={{
          color: "yellow",
          textAlign: "center",
          margin: "10px auto 0",
          letterSpacing: "1px",
        }}
      >
        Play on Telegram Mobile!
      </h3>
    </div>
  );
};

export default NotMobileDevice;
