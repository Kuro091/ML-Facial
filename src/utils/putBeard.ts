import * as FaceAPI from 'face-api.js';
import overlay from '@/assets/images/overlay.png';

const getOverlayValues = (landmarks: FaceAPI.FaceLandmarks68) => {
  const leftEye = landmarks.getLeftEye();
  const jawLine = landmarks.getJawOutline();
  
  const jawLeft = jawLine[0];
  const jawRight = jawLine.splice(-1)[0];

  const adjacent = jawRight.x - jawLeft.x;
  const opposite = jawRight.y - jawLeft.y;

  const jawLength = Math.sqrt(
    Math.pow(jawRight.x - jawLeft.x, 2) + Math.pow(jawRight.y - jawLeft.y, 2)
  )

  const angle = Math.round(Math.tan(opposite / adjacent) * 100)

  return {
    width: jawLength,
    angle,
    leftOffset: leftEye[0].x,
    topOffset: leftEye[0].y,
  }
  

}

export const putBeard = async ({
  imgRef,
  containerRef,
}: {
  imgRef: HTMLImageElement | null;
  containerRef: HTMLDivElement | null;
}) => {
  await Promise.all([
    FaceAPI.nets.tinyFaceDetector.loadFromUri('/models'),
    FaceAPI.nets.faceLandmark68TinyNet.loadFromUri('/models'),
  ]).catch((err) => console.log(err));

  if (imgRef) {
    const scale = imgRef.width / imgRef.naturalWidth;

    const detection = await FaceAPI.detectSingleFace(
      imgRef,
      new FaceAPI.TinyFaceDetectorOptions()
    ).withFaceLandmarks(true);

    if (!detection) {
      return;
    }

    const overlayValues = getOverlayValues(detection.landmarks);


    const beardEle = document.createElement('img') as HTMLImageElement;
    beardEle.src = overlay;
    beardEle.style.cssText = `
      position: absolute;
      left: ${overlayValues.leftOffset}px;
      top: ${overlayValues.topOffset}px;
      width: ${overlayValues.width}px;
      transform: rotate(${overlayValues.angle}deg);
    `;

    containerRef?.appendChild(beardEle);
  }
}