import React, { useEffect, useState } from 'react';

const CountDown = (props) => {
  const [countdown, setCountdown] = useState(0);
  const[expire , setExpire] = useState(false);
  useEffect(() => {
    const targetDate = new Date(props.time); // Replace with your target date
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update the countdown state
      setCountdown({ days, hours, minutes, seconds });

      if(days <= 0 && hours <= 0 && minutes <= 0 && seconds <=0){
        setExpire(true)
      }
      // Clear the interval when the countdown reaches zero
      if (distance < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className='countDownTime'>
        {
            expire == true ? <p>Expired</p> : 
        <p>{countdown.days}d : {countdown.hours}h : {countdown.minutes}m : {countdown.seconds}s</p>
        }
    </div>
  );
};

export default CountDown;
