import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ text }) => {
  const [displayLength, setDisplayLength] = useState(0);

  useEffect(() => {
    const maxLen = text.length;
    setDisplayLength(0);

    const intervalId = setInterval(() => {
      setDisplayLength((currentLength) => {
        if (currentLength < maxLen) {
          return currentLength + 1;
        } else {
          clearInterval(intervalId);
          return currentLength;
        }
      });
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  return <h2>{text.slice(0, displayLength)}</h2>;
};

export default Typewriter;
