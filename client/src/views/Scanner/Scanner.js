import React, { useState, useEffect, useRef } from 'react';
import './Scanner.css';
import QrScanner from 'qr-scanner';

const Scanner = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [cameraDevices, setCameraDevices] = useState([]);

  const videoRef = useRef(null);

  useEffect(() => {
    if (showScanner && videoRef.current) {
      const qrScanner = new QrScanner(videoRef.current, (result) => {
        setShowScanner(false);
        window.location.href = result;
      });
      qrScanner.start();
    }
  }, [showScanner, videoRef]);

  useEffect(() => {
    QrScanner.hasCamera().then((hasCamera) => {
      if (hasCamera) {
        QrScanner.listCameras().then((devices) => {
          setCameraDevices(devices);
        });
      }
    });
  }, []);

  return (
    <div>
      {!showScanner && (
        <div className="scanner text-center mt-5">
          <button className="btn mt-5" onClick={() => setShowScanner(true)}>
            Open Scanner
          </button>
        </div>
      )}
      {showScanner && (
        <div className="text-center video">
          <video ref={videoRef} style={{ height: '100vh', width: '100vw' }} />
        </div>
      )}

      {cameraDevices.length > 0 && (
        <div className="camera-device text-center mt-5">
          <h3>Camera Devices</h3>
          <ul>
            {cameraDevices.map((device, index) => (
              <li key={index}>{device.label}</li>
            ))}
          </ul>
          </div>
      )}
    </div>
  );
};

export default Scanner;
