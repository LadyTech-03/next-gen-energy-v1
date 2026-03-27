"use client";

import { useEffect, useMemo, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DEFAULT_TARGET_DATE = "2026-09-15T12:00:00Z";
const EMPTY_TIME_LEFT: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getTargetDate() {
  const configuredDate = process.env.NEXT_PUBLIC_CHALLENGE_TARGET_DATE ?? DEFAULT_TARGET_DATE;
  const parsedDate = new Date(configuredDate);

  if (Number.isNaN(parsedDate.getTime())) {
    return new Date(DEFAULT_TARGET_DATE);
  }

  return parsedDate;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const difference = target.getTime() - Date.now();

  if (difference <= 0) {
    return EMPTY_TIME_LEFT;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function formatUnit(value: number) {
  return value.toString().padStart(2, "0");
}

export function CountdownTimer() {
  const targetDate = useMemo(() => getTargetDate(), []);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(EMPTY_TIME_LEFT);

  useEffect(() => {
    const tick = () => {
      setTimeLeft(calculateTimeLeft(targetDate));
    };

    const timeout = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 1000);

    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [targetDate]);

  return (
    <div
      className="inline-flex flex-wrap items-center gap-3 rounded-lg border border-white/20 bg-black/35 px-4 py-3"
      aria-label="Countdown to challenge event"
      role="timer"
    >
      <div className="text-center">
        <p className="text-2xl font-bold text-white">{formatUnit(timeLeft.days)}</p>
        <p className="text-xs tracking-wide text-white/70 uppercase">Days</p>
      </div>
      <div className="h-8 w-px bg-white/20" aria-hidden="true" />
      <div className="text-center">
        <p className="text-2xl font-bold text-white">{formatUnit(timeLeft.hours)}</p>
        <p className="text-xs tracking-wide text-white/70 uppercase">Hours</p>
      </div>
      <div className="h-8 w-px bg-white/20" aria-hidden="true" />
      <div className="text-center">
        <p className="text-2xl font-bold text-white">{formatUnit(timeLeft.minutes)}</p>
        <p className="text-xs tracking-wide text-white/70 uppercase">Minutes</p>
      </div>
      <div className="h-8 w-px bg-white/20" aria-hidden="true" />
      <div className="text-center">
        <p className="text-2xl font-bold text-white">{formatUnit(timeLeft.seconds)}</p>
        <p className="text-xs tracking-wide text-white/70 uppercase">Seconds</p>
      </div>
    </div>
  );
}
