import MainLayout from '@/components/Layouts/MainLayout';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import cat from '@/assets/images/cat.png';

export const ScrollingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });
  const bottomShadowValue = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);
  const imgValue = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);
  const topShadowValue = useTransform(scrollYProgress, [0, 1], ['-25%', '100%']);

  return (
    <MainLayout>
      <section
        className='min-h-screen my-96 flex content-between flex-wrap m-[100px_auto]'
        ref={containerRef}
      >
        {/* copy */}
        <div className='grid place-items-center w-[40%] text-5xl ml-[5%] text-left'>
          <h1>This is a text</h1>
        </div>

        {/* img */}
        <div className='flex items-center relative w-1/2'>
          <motion.div
            style={{
              translateX: imgValue,
            }}
          >
            <motion.div
              style={{
                translateX: bottomShadowValue,
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(0,0,0,0.43) 40%)',
              }}
              className='h-full w-full absolute left-0 z-0'
            />
            <img src={cat} className='relative w-full z-[1]' />
            <motion.div
              style={{
                translateX: topShadowValue,
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(0,0,0,0.43) 80%)',
              }}
              className='bg-blue-400 h-full w-full absolute left-0 top-0 z-[2]'
            />
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};
