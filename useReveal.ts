import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useReveal<T extends HTMLElement>(ref: RefObject<T | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const items = root.querySelectorAll<HTMLElement>('[data-reveal]');
    const ctx = gsap.context(() => {
      items.forEach((item) => gsap.fromTo(item, { y: 32, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: item, start: 'top 88%', once: true },
      }));
    }, root);
    return () => ctx.revert();
  }, [ref]);
}
