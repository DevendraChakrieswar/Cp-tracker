import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../Home.css';

const TypingText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const typingCompleted = useRef(false); // Prevents re-triggering

  useEffect(() => {
    if (typingCompleted.current) return; // Prevent multiple runs
    typingCompleted.current = true;

    let index = 0;
    const typingInterval = setInterval(() => {
      setDisplayText(text.slice(0, index + 1)); // Slice method avoids undefined issues
      index++;

      if (index === text.length) clearInterval(typingInterval);
    }, 150); // Typing speed

    // Blinking cursor effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, [text]);

  return (
    <div className="bubble central font-mono font-bold hover:cursor-default">
      {displayText}
      <span className={`cursor ${showCursor ? "visible" : "hidden"}`}>|</span>
    </div>
  );
};

const Home = () => {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center'>
      <div className="bubble-container">
        <Link to='/' className='bubble-container '>
        <TypingText text="Code Glance" />
        </Link>
        <div className="bubble bubble1">
          <Link to='/batch-report'>Batch Report</Link>
        </div>
        <div className="bubble bubble2">
          <Link to='/student-report'>Student Report</Link>
        </div>
        <div className="bubble bubble3">
          <Link to='/cp-report'>CP Report</Link>
        </div>
        <div className="bubble bubble4">
          <Link to='/compare'>Compare</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
