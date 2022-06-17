import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useCountdown(date) {
  const [intervalId, setIntervalId] = useState();
  const [startTime, setStartDate] = useState(date);
  const [countdown, setCountdown] = useState({
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    const id = setInterval(() => setNewTime(), 1000);
    setIntervalId(id);
    return () => clearInterval(id);

  }, [startTime]);

  const setNewTime = () => {
    const endTime = new Date();
    const distanceToNow = endTime- startTime ;
    const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2);
    const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

    setCountdown({
      minutes: getMinutes || '000',
      seconds: getSeconds || '000'
    });
  };

  return {
    countdown,
    stopProcess: () => {
      clearInterval(intervalId)
    },
    resteCountDown:()=>{
      setCountdown({
        minutes: '00',
        seconds: '00'
      })
      setStartDate(new Date())
    }
  }
}
