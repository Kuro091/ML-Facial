import MainLayout from '@/components/Layouts/MainLayout';
import peepImg3 from '@/assets/images/people_3.jpg';
import peepImg2 from '@/assets/images/people_2.jpg';
import peepImg1 from '@/assets/images/people_1.jpg';
import peepImg4 from '@/assets/images/people_4.jpg';
import { useEffect, useRef } from 'react';
import { putBeard } from '@/utils/putBeard';

const peepImgs = [peepImg1, peepImg2, peepImg3, peepImg4];

const Landing = () => {
  const containerRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    containerRefs.current?.length &&
      containerRefs.current?.length > 0 &&
      containerRefs.current?.forEach((ref) => {
        putBeard({
          containerRef: ref as HTMLDivElement,
        });
      });
  }, []);

  return (
    <MainLayout>
      <div className='relative mx-auto w-[900px]'>
        <div className='grid grid-cols-2 grid-rows-2 gap-[20px] mx-[50px] max-w-[90vw]'>
          {peepImgs.map((img, index) => (
            <div
              key={index}
              ref={(ref) => containerRefs.current?.push(ref as HTMLDivElement)}
              className='max-w-full relative'
            >
              <img className='w-full' src={img} />
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Landing;
