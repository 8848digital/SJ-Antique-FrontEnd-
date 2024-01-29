import Image from 'next/image';
import React from 'react';
import noRecordImg from '../../public/assets/no_record.jpg';
import { useRouter } from 'next/router';

const NoRecord = ({ title, heading, backButtonUrl, HandleRefresh }: any) => {
  const router = useRouter();

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div>
          <div className="text-center">
            <Image
              src={noRecordImg}
              width={200}
              height={200}
              alt="Picture of no record"
              className="text-center"
            />
          </div>
          <h4>{title}</h4>
          <p>{heading}</p>
          <div className="text-center">
            {backButtonUrl ? (
              <button
                type="button"
                onClick={() => router?.push(backButtonUrl)}
                className="btn btn-primary px-2"
              >
                Go Back
              </button>
            ) : (
              <button
                type="button"
                onClick={HandleRefresh}
                className="btn btn-primary px-2"
              >
                Refresh
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NoRecord;
