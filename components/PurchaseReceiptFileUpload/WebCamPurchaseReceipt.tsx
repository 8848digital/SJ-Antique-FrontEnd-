import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const WebCamPurchaseReceipt = () => {
  const webcamRef = useRef<Webcam>(null);

  const [activeWebcam, setActiveWebCam] = useState<any>(false);

  const capturePhoto = () => {
    setActiveWebCam(true);
    const imageSrc = webcamRef.current?.getScreenshot();
    console.log('capture run', webcamRef);
    if (imageSrc) {
      setTimeout(() => {
        window.open(imageSrc, '_blank');
      }, 100);
    }

    console.log(imageSrc);
  };
  return (
    <>
      {activeWebcam && (
        <>
<<<<<<< HEAD
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            height={320}
            width={380}
            // value={showFile}
          />
          <button className="btn btn-primary" onClick={capturePhoto}>
            Take photo
          </button>
=======
            {activeWebcam && (
                <>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        height={320}
                        width={380}
                    // value={showFile}
                    />
                    <button className='btn btn-primary' >Take photo</button>
                </>
            )}
            <i
                className="fa-solid fa-camera-retro px-2 text-warning fs-5"
                onClick={capturePhoto}
            ></i>
            <p className="m-0">Camera</p>
>>>>>>> 6a2c928853c4155a9617e2a67659a417eee8aa56
        </>
      )}
      <i className="fa-solid fa-camera-retro px-2 text-warning fs-5"></i>
      <p className="m-0">Camera</p>
    </>
  );
};

export default WebCamPurchaseReceipt;
