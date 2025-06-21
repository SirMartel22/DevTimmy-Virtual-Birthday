// import React { useState, useEffect } from 'react';


// const Coming = () => {
//   const [timeLeft, setTimeLeft] = useState({
//     days: 0;
//     hours: 0,
//     minutes: 0,
//     seconds: 0
//   })

//   const [isExpired, setIsExpired] = usestate(false);

//   useEffect(() => {
//     const targetDate = new Date('2025-06-22T01:00:00').getTime()

//     const updateCountdown = () => {
//       const now = new Date().getTime();
//       const difference = targetDate - now;

//       if (difference > 0) {
//         const days = Math.floor(difference / (1000 * 60 * 60 * 24));
//         const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//         const minutes = Math.florr((difference % (1000 * 60 * 60)) / (1000 * 60));
//         const seconds = Math.floor((difference % (1000 * 60)) / 1000)
        
//         setTimeLeft({ days, hours, minutes, seconds });
//         setIsExpired(false);
//       } else {
//         setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
//       }
//     };

//     updateCountdown()
//     const interval = setInterval(updateCountdown, 1000);

//     return () => clearInterval(interval)
//   }, []);

//   const TimeUnit = ({})

//   return (
//       <div className="flex flex-col items-center justify-center gap-4">
//           <h2 className="text-3xl font-bold text-center leading-[1.5em]">Welcome to Official Virtu Festiva Event Website</h2>

//           <h3>The Event Starts by 1am, 22nd of June, 2025. </h3>
//           <h3>See you soon </h3>
//     </div>
//   );
// }

// export default Coming;
import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const targetDate = new Date('2025-06-22T01:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsExpired(false);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsExpired(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-700">
      <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2 tabular-nums">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-sm md:text-base text-slate-400 uppercase tracking-widest font-medium">
        {label}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900  to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center leading-[1.5em] pb-8">Welcome to Official VIRTU FESTIVA Event Website</h2>
           <h3>The Event go <span className="bg-red-900 py-1 px-1 rounded-md font-bold">Live</span> by 1am, 22nd of June, 2025. </h3>
            
        </div>

        {isExpired ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4">
              Time's Up!
            </h2>
            <p className="text-xl text-slate-300">
              The countdown has reached zero!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
            <TimeUnit value={timeLeft.seconds} label="Seconds" />
          </div>
        )}

        <div className="text-slate-500 text-sm pt-12 pb-12">
          <h3 className="text-2xl">See you soon 😉😉😉</h3>
        </div>
      </div>
    </div>
  );
}
