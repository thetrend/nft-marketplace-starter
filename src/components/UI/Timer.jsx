import { useEffect, useState } from "react";

const Timer = ({ timestamp }) => {
  const calculateTimeLeft = () => {
    const now = Date.now();
    const difference = timestamp - now;

    if (difference <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <>
      {String(timeLeft.hours)}h{' '}
      {String(timeLeft.minutes)}m{' '}
      {String(timeLeft.seconds)}s
    </>
  );
};

export default Timer;
