import MainLayout from '@/components/Layouts/MainLayout';
import peepImg from '@/assets/images/people.jpg';
import { useEffect, useRef } from 'react';
import { putBeard } from '@/utils/putBeard';

const Landing = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    putBeard({
      containerRef: containerRef?.current,
      imgRef: imgRef?.current,
    });
  }, []);

  return (
    <MainLayout>
      <div
        ref={containerRef}
        className='w-80 min-h-[20rem] h-80 container relative flex mx-auto justify-center items-center'
      >
        <img ref={imgRef} className='absolute w-full h-full' src={peepImg} />
      </div>
    </MainLayout>
  );
};

export default Landing;
