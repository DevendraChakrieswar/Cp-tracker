import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../Home.css";
import homebackgroundImage from "../assets/images/banner-background.webp";

const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const indexRef = useRef(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayText(text.slice(0, indexRef.current + 1));
      indexRef.current++;

      if (indexRef.current === text.length) {
        setTimeout(() => {
          indexRef.current = 0;
          setDisplayText("");
        }, 1000);
      }
    }, 150);

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <div className="bubble cn central font-mono font-bold hover:cursor-pointer ">
      {displayText}
      <span className={`cursor ${showCursor ? "visible" : "hidden"}`}>|</span>
    </div>
  );
};

const Home = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = homebackgroundImage;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-col justify-center items-center
        ${imageLoaded ? "opacity-100" : "opacity-0"}`}
      style={{
        backgroundImage: imageLoaded ? `url(${homebackgroundImage})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#3A0784",
      }}
    >
      <div className="bubble-container">
        <Link to="/" className="bubble-container">
          <TypingText text="CODE GLANCE" />
        </Link>
        <div className="bubble bubble1">
          <Link to="/batch-report">Batch Report</Link>
        </div>
        <div className="bubble bubble2">
          <Link to="/student-report">Student Report</Link>
        </div>
        <div className="bubble bubble3">
          <Link to="/cp-report">CP Report</Link>
        </div>
        <div className="bubble bubble4">
          <Link to="/compare">Compare</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
