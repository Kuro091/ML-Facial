import * as FaceAPI from 'face-api.js';
import overlay from '@/assets/images/overlay-frankenstein.png';

const getOverlayValues = (landmarks: FaceAPI.FaceLandmarks68) => {
  const nose = landmarks.getNose();
  const jawLine = landmarks.getJawOutline();
  
  const jawLeft = jawLine[0];
  const jawRight = jawLine.splice(-1)[0];

  const adjacent = jawRight.x - jawLeft.x;
  const opposite = jawRight.y - jawLeft.y;

  const jawLength = Math.sqrt(
    Math.pow(adjacent, 2) + Math.pow(opposite, 2)
  )

  const angle = Math.atan2(opposite, adjacent) * (180 / Math.PI);
  const width = jawLength * 2.2; // 2.2 is calculated from overlay, outer/inner 

  return {
    width,
    angle,
    leftOffset: jawLeft.x - width * 0.1785,
    topOffset: nose[0].y -width * 0.395,
  }
}

export const putBeard = async ({
  containerRef,
}: {
  containerRef: HTMLDivElement | null;
}) => {
  await Promise.all([
    FaceAPI.nets.tinyFaceDetector.loadFromUri('/models'),
    FaceAPI.nets.faceLandmark68TinyNet.loadFromUri('/models'),
  ]).catch((err) => console.log(err));

  const img = containerRef?.querySelector('img');

  if (img) {
    const scale = img.width / img.naturalWidth;

    const detection = await FaceAPI.detectSingleFace(
      img,
      new FaceAPI.TinyFaceDetectorOptions()
    ).withFaceLandmarks(true);

    if (!detection) {
      return;
    }

    const overlayValues = getOverlayValues(detection.landmarks);

    // detection.landmarks.getJawOutline().forEach((pt) => {
    //   const jawPoint = document.createElement('div');
    //   jawPoint.style.cssText = `
    //     position: absolute;
    //     left: ${pt.x * scale}px;
    //     top: ${pt.y * scale}px;
    //     width: 5px;
    //     height: 5px;
    //     background: red;
    //   `;
    //   containerRef?.appendChild(jawPoint);
    // });

    const beardEle = document.createElement('img') as HTMLImageElement;
    beardEle.src = overlay;
    beardEle.style.cssText = `
      position: absolute;
      left: ${overlayValues.leftOffset * scale}px;
      top: ${overlayValues.topOffset * scale}px;
      width: ${overlayValues.width * scale * 2}px;
      transform: rotate(${overlayValues.angle}deg);
    `;

    containerRef?.appendChild(beardEle);

  }
}