'use client';

import { useEffect, useRef, useState } from 'react';
import s from './page.module.css';

const titles = ['Request your migration', 'Copy your website & email', 'Set up a private preview', 'Test before switching', 'Make the switch'];

export default function MigrationTimeline({ steps }: { steps: string[] }) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const rows = Array.from(list.current?.children ?? []);
      const focusLine = window.innerHeight * 0.45;
      let closest = 0;
      let distance = Infinity;
      rows.forEach((row, index) => {
        const rect = row.getBoundingClientRect();
        const nextDistance = Math.abs(rect.top + Math.min(rect.height / 2, 45) - focusLine);
        if (nextDistance < distance) {
          distance = nextDistance;
          closest = index;
        }
      });
      setActive(closest);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <ol ref={list} className={s.migrationTimeline}>
      {steps.map((step, index) => (
        <li key={step} className={active === index ? s.activeStep : undefined} aria-current={active === index ? 'step' : undefined}>
          <span className={s.stepMarker}>{index + 1}</span>
          <div><h3>{titles[index]}</h3><p>{step}</p></div>
        </li>
      ))}
    </ol>
  );
}
