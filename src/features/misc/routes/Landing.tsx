import MainLayout from '@/components/Layouts/MainLayout';
import beard from '@/assets/images/fake-beard.png';
import * as FaceAPI from 'face-api.js';
import { useEffect, useRef } from 'react';

const Landing = () => {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    async function loadModels() {
      await Promise.all([
        FaceAPI.nets.tinyFaceDetector.loadFromUri('/models'),
        FaceAPI.nets.faceLandmark68TinyNet.loadFromUri('/models'),
      ]).catch((err) => console.log(err));

      if (imgRef?.current) {
        const detection = await FaceAPI.detectSingleFace(
          imgRef?.current,
          new FaceAPI.TinyFaceDetectorOptions()
        ).withFaceLandmarks(true);
      }
    }

    loadModels();
  }, []);

  return (
    <MainLayout>
      <div className='container relative flex mx-auto h-full justify-center items-center'>
        <img ref={imgRef} className='absolute' src='http://placekitten.com/300/400' />
        <div
          className='absolute w-20 top-[200px] left-[55px] -rotate-3'
          style={{
            filter:
              'invert(100%) sepia(0%) saturate(7482%) hue-rotate(3deg) brightness(95%) contrast(104%)',
          }}
        >
          <img src={beard} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Landing;
