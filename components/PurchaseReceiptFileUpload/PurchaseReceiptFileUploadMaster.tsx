import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Webcam from 'react-webcam';
import styles from '../../styles/readyReceipts.module.css';
import WebCamPurchaseReceipt from './WebCamPurchaseReceipt';

const PurchaseReceiptFileUploadMaster = ({ handleFieldChange, item, handleClearFileUploadInput }: any) => {
    const webcamRef = useRef<Webcam>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [photoModalshow, setPhotoModalShow] = useState(false);
    const [showFile, setShowFile] = useState<any>();

    const handlePhotaModalClose = () => setPhotoModalShow(false);
    const handleShowPhotoModal = () => setPhotoModalShow(true);

    const capturePhoto = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        console.log('capture run');
        console.log(imageSrc);
    };
    const handleUploadClick = () => {
        console.log('file upload click');
        fileInputRef.current?.click();
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            console.log('file uploaded');
            setShowFile(file);
            console.log(file);
        }
    };
    // const handleClearFileUploadInput: any = (id: any) => {
    // }
    console.log("file url", item.custom_add_photo)
    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <div className='w-75 '>
                    <input
                        type="text"
                        className={` ${styles.input_field}`}
                        placeholder="attach"
                        value={item?.custom_add_photo}
                        onClick={handleShowPhotoModal}
                    />

                </div>
                <div className='px-2'>
                    {/* {
                        Object.keys(item.custom_add_photo)?.length > 0 && ( */}

                    <i className='fa fa-xmark' onClick={() => handleClearFileUploadInput(item.idx)}>

                    </i>
                    {/* )
                    } */}
                </div>

            </div>



            <Modal show={photoModalshow} onHide={handlePhotaModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-block text-center py-5 ">
                        <div className="row justify-content-center">
                            <div className="col-lg-3 d-block text-center px-1">
                                <i
                                    className="fa-solid fa-computer px-2 text-primary fs-5"
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
                            </div>
                            <div className="col-lg-3 d-block text-center px-1 ">
                                <WebCamPurchaseReceipt />
                            </div>
                        </div>
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
