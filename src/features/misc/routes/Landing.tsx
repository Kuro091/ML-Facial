import MainLayout from '@/components/Layouts/MainLayout';
import beardImg from '@/assets/images/fake-beard.png';
import peepImg from '@/assets/images/people.jpg';
import * as FaceAPI from 'face-api.js';
import { useEffect, useRef } from 'react';

const Landing = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

        if (!detection) {
          return;
        }

        const leftEyeLopez = detection.landmarks.getLeftEye();
        console.log(leftEyeLopez);

        const beardEle = document.createElement('img') as HTMLImageElement;
        beardEle.src = beardImg;
        beardEle.style.cssText = `
          position: absolute;
          width: 200px;
          top: calc(${leftEyeLopez[0].y / 2}px + 90px);
          left: calc(${leftEyeLopez[0].x / 2}px + 20px);
          transform: rotate(5deg);
        `;
        console.log(beardEle);

        containerRef?.current?.appendChild(beardEle);
      }
    }

    loadModels();
  }, []);

  return (
    <MainLayout>
      <div
        ref={containerRef}
        className='w-80 h-96 container relative flex mx-auto justify-center items-center'
      >
        <img ref={imgRef} className='absolute w-full h-full' src={peepImg} />
      </div>
    </MainLayout>
  );
};

export default Landing;
