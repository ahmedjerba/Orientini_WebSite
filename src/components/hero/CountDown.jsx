import { useState, useEffect } from 'react';

export default function Countdown() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2026-07-19T09:00:00") - +new Date();
    if (difference <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 };

    return {
      jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
      heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      secondes: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  const formatNumber = (num) => String(num).padStart(2, '0');

  const timeBlocks = [
    { label: 'Jours', value: timeLeft.jours },
    { label: 'Heures', value: timeLeft.heures },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.secondes }
  ];

  return (
    <div className="w-full max-w-md bg-bleu text-white p-5 rounded-2xl shadow-xl border border-bleu/50 mt-6 mx-auto lg:mx-0">
      <p className="text-center text-xs font-bold uppercase tracking-widest text-cyan mb-3">
        ⏳ Lancement de l'événement dans :
      </p>
      <div className="grid grid-cols-4 gap-2 text-center">
        {timeBlocks.map((item, idx) => (
          <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/5">
            <span className="block text-2xl md:text-3xl font-black text-jaune tabular-nums">
              {formatNumber(item.value)}
            </span>
            <span className="text-[10px] uppercase font-bold text-gray-300 tracking-wider">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}