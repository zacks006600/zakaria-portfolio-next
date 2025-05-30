'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollyImages from '../components/ScrollyImagesPage'
export default function Home() {
  const loaderRef = useRef(null);
  const topRef = useRef(null);
  const centerRef = useRef(null);
  const bottomRef = useRef(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [startContent, setStartContent] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.from(topRef.current, { opacity: 0, y: -30, duration: 0.8 })
      .from(centerRef.current, { opacity: 0, scale: 0.8, duration: 0.8 }, '+=0.3')
      .from(bottomRef.current, { opacity: 0, y: 30, duration: 0.8 }, '+=0.3')
      .to(loaderRef.current, {
        x: '100%',
        duration: 1.2,
        ease: 'power3.inOut',
        onComplete: () => {
          setLoadingDone(true);
          setTimeout(() => setStartContent(true));
        },
      });

    return () => tl.kill();
  }, []);

  return (
    <>
      {!loadingDone && (
        <div
          ref={loaderRef}
          className="fixed inset-0 z-50 bg-black text-white font-berg overflow-hidden"
        >
          <div className="flex flex-col justify-between h-full p-6">
            <div ref={topRef} className="text-8xl font-bold">Zakaria Ahmad</div>
            <div ref={centerRef} className="flex justify-center items-center text-8xl font-bold">Full-stack</div>
            <div ref={bottomRef} className="text-right text-8xl font-bold">Developer</div>
          </div>
        </div>
      )}

      {startContent && (
        <div className="container mx-auto p-10 bg-white min-h-screen text-black">
          <ScrollyImages />
        </div>
      )}
    </>
  );
}
