import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Webcam from 'react-webcam';
import styles from '../../styles/readyReceipts.module.css';

const PurchaseReceiptFileUploadMaster = ({
  handleFieldChange,
  item,
  handleClearFileUploadInput,
}: any) => {
  const webcamRef = useRef<Webcam>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoModalshow, setPhotoModalShow] = useState(false);
  const [showWebcam, setShowWebcam] = useState(false);
  const [showFile, setShowFile] = useState<any>();
  const [capturedImage, setCapturedImage] = useState<string | null>('');

  const handlePhotaModalClose = () => {
    setPhotoModalShow(false);
    setCapturedImage(null);
    setShowWebcam(false);
  };

  const handleShowPhotoModal = () => {
    setPhotoModalShow(true);
    setShowWebcam(false);
  };

  const toggleWebcam = () => {
    setShowWebcam((prevState) => !prevState);
  };

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setCapturedImage(imageSrc || null);
    setShowWebcam(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setShowFile(file);
    }
  };
  // const handleClearFileUploadInput: any = (id: any) => {
  // }
  console.log('file url', item.custom_add_photo);
  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="w-75 ">
          <input
            type="text"
            className={` ${styles.input_field}`}
            placeholder="Attach"
            value={item?.custom_add_photo}
            onClick={handleShowPhotoModal}
          />
        </div>
        <div className="px-2">
          <i
            className="fa fa-xmark"
            onClick={() => handleClearFileUploadInput(item.idx)}
          ></i>
        </div>
      </div>
      <Modal show={photoModalshow} onHide={handlePhotaModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            <button className="btn btn-file-upload">
              <i
                className="fa-solid fa-computer px-2 text-warning fs-5"
                onClick={handleUploadClick}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(e) =>
                    handleFieldChange(
                      item.idx,
                      'tableRow',
                      'custom_add_photo',
                      `/files/${e.target.files?.[0]?.name}`,
                      e.target.files?.[0]
                    )
                  }
                />
              </i>
              <p className="m-0" onClick={handleUploadClick}>
                My computer
              </p>
            </button>
            <button className="btn btn-file-upload" onClick={toggleWebcam}>
              <i
                className={`fa ${
                  showWebcam ? 'fa-times' : 'fa-camera'
                } px-2 text-primary fs-5`}
              ></i>
              <p className="m-0">
                {showWebcam ? 'Close Camera' : 'Open Camera'}
              </p>
            </button>
            {showWebcam && (
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={{
                  width: 1280,
                  height: 720,
                  facingMode: 'user',
                }}
              />
            )}
            {capturedImage && (
              <img
                src={capturedImage}
                alt="Captured"
                className="img-thumbnail"
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePhotaModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePhotaModalClose}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PurchaseReceiptFileUploadMaster;
