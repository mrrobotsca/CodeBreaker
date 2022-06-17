import { useState, useEffect } from 'react';

// CountDown Hook , getting the Date as input . With an interval of 1sec , it convert the date to minutes and seconds
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
    stopTimer: () => {
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
