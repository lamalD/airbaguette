// components/FlightSplitBoard.jsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789'.split('');

const FlipChar = ({ targetChar }) => {
  const [currentChar, setCurrentChar] = useState(' ');
  const [flipping, setFlipping] = useState(true);

  useEffect(() => {
    let index = 0;
    const targetIndex = CHARACTERS.indexOf(targetChar.toUpperCase());
    const interval = setInterval(() => {
      setCurrentChar(CHARACTERS[index % CHARACTERS.length]);
      index++;
      if (index >= targetIndex + CHARACTERS.length) {
        clearInterval(interval);
        setCurrentChar(targetChar.toUpperCase());
        setFlipping(false);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [targetChar]);

  return (
    <motion.div
      className="bg-black text-white w-10 h-14 flex items-center justify-center font-mono text-xl border border-gray-700 rounded-sm"
      animate={{ rotateX: flipping ? 180 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentChar}
    </motion.div>
  );
};

const WordDisplay = ({ word }) => {
  const padded = word.padEnd(15);
  return (
    <div className="flex gap-1">
      {padded.split('').map((char, i) => (
        <FlipChar key={i} targetChar={char} />
      ))}
    </div>
  );
};

const flights = [
  { destination: 'BIRDSTRIKE', time: 'NOW', gate: 'A1', status: 'NEW' },
  { destination: 'REDEYE', time: 'ALL DAY', gate: 'A2', status: 'SPECIAL' },
  { destination: 'GATE GOURMET', time: '12:00', gate: 'A3', status: 'ON TIME' },
  { destination: 'BLT CHICKEN', time: '13:30', gate: 'A5', status: 'NEW' },
];

export default function FlightSplitBoard() {
  return (
    <div className="bg-neutral-900 rounded-xl p-6 max-w-5xl mx-auto text-white shadow-lg">
      <h2 className="text-yellow-400 font-bold text-2xl mb-4 flex items-center gap-2">
        ✈️ DEPARTURES
      </h2>
      <div className="grid gap-4">
        {flights.map((flight, i) => (
          <div key={i} className="grid grid-cols-4 gap-4">
            <WordDisplay word={flight.destination} />
            <WordDisplay word={flight.time} />
            <WordDisplay word={flight.gate} />
            <WordDisplay word={flight.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
