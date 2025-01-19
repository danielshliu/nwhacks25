// pages/index.js
"use client";
import { useEffect, useRef } from 'react';

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        // Dynamsoft Camera Enhancer setup
        const Dynamsoft = await import('dynamsoft-camera-enhancer');
        const cameraEnhancer = await Dynamsoft.DCECameraEnhancer.createInstance();

        // Bind the camera enhancer to the video element
        cameraEnhancer.setUIElement(videoRef.current);
        await cameraEnhancer.open();
      } catch (error) {
        console.error("Error initializing Dynamsoft Camera Enhancer:", error);
        alert("Unable to initialize the camera. Please check your permissions and settings.");
      }
    };

    initCamera();

    return () => {
      // Cleanup: Close the camera when the component unmounts
      const cleanupCamera = async () => {
        try {
          const Dynamsoft = await import('dynamsoft-camera-enhancer');
          const cameraEnhancer = Dynamsoft.DCECameraEnhancer.instance;
          if (cameraEnhancer) {
            await cameraEnhancer.close();
          }
        } catch (error) {
          console.error("Error during camera cleanup:", error);
        }
      };
      cleanupCamera();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Camera Access with Dynamsoft in Next.js</h1>
      <div>
        <div
          ref={videoRef}
          style={{ width: '100%', height: '500px', border: '1px solid #ccc', margin: '10px auto' }}
        ></div>
      </div>
    </div>
  );
}
