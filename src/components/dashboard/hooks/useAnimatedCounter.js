import { useEffect, useState } from "react";

export const useAnimatedCounter = (target, duration = 900, enabled = true) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, enabled]);

  return value;
};
