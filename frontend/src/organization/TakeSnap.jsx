import React, { useState, useEffect, useRef } from "react";
import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import base64ToHttps from "./ImageConverter";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";

function TakeSnapFunction({ imageTrigger, setImageTrigger }) {
  const webcamRef = useRef(null); // Create a reference to the webcam
  const [imageUrl, setImageUrl] = useState(null); // Create a state to store the image URL

  // const capture = () => {
  //   // Use the webcamRef to capture a photo
  //   const imageSrc = webcamRef.current.getScreenshot();
  //   // Convert the image data to a Blob
  //   const imageBlob = new Blob([imageSrc], { type: "image/png" });
  //   // Create a URL object for the Blob
  //   const imageUrl = URL.createObjectURL(imageBlob);
  //   // Set the image URL state to the HTTPS version of the URL object
  //   setImageUrl(imageUrl.replace("http://", "https://"));
  // };

  // const cameraRef = useRef(null);
  let flag = false;
  const [imgURI, setImgUri] = useState("");
  function handleTakePhoto(dataUri) {
    setTimeout(() => {
      // console.log("dataUri", dataUri);
      let tingTong = base64ToHttps(dataUri);
      setImgUri(tingTong);
      console.log("dataUri", dataUri);
    }, 2000);
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const dataUri = "data:image/jpeg;base64,/9j/4AAQSkZJRgA..."; // replace with your dataUri parameter
  //     if (cameraRef.current) {
  //       cameraRef.current.onTakePhoto(dataUri);
  //       console.log(dataUri);
  //     }
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  function handleTakePhotoAnimationDone(dataUri) {
    // Do stuff with the photo...
    // console.log("takePhoto");
  }

  function handleCameraError(error) {
    // console.log("handleCameraError", error);
  }

  function handleCameraStart(stream) {
    // console.log("handleCameraStart");
  }

  function handleCameraStop() {
    // console.log("handleCameraStop");
  }

  const canvasRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);

  useEffect(() => {
    async function loadModels() {
      await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      setModelsLoaded(true);
    }
    loadModels();
  }, []);

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const imageBlob = new Blob([imageSrc], { type: "image/png" });
    const imageUrl = URL.createObjectURL(imageBlob);
    setImageUrl(imageUrl.replace("http://", "https://"));

    if (canvasRef.current && modelsLoaded) {
      const image = await faceapi.fetchImage(imageUrl);
      const detections = await faceapi
        .detectAllFaces(image)
        .withFaceLandmarks();
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      detections.forEach((detection) => {
        const landmarks = detection.landmarks;
        const jawline = landmarks.getJawOutline();
        const nose = landmarks.getNose();
        const leftEye = landmarks.getLeftEye();
        const rightEye = landmarks.getRightEye();
        const mouth = landmarks.getMouth();
        // Draw lines on face using the detected landmarks
        ctx.beginPath();
        ctx.moveTo(jawline[0].x, jawline[0].y);
        jawline.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(jawline[0].x, jawline[0].y);
        ctx.stroke();
        // Repeat for other facial landmarks
      });
    }
  };

  return (
    // <div className="w-full">
    //   <Webcam audio={false} ref={webcamRef} screenshotFormat="png" style={{height: '120%', width: '120%'}} />
    //   {imageUrl && (
    //     <a href={imageUrl} target="_blank" rel="noopener noreferrer">
    //       <img src={imageUrl} alt="Webcam capture" />
    //     </a>
    //   )}
    // </div>
    <div>
      <div className="w-full">
        {/* <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="png"
          style={{ height: "100%", width: "100%" }}
        /> */}
        {/* {imageUrl && (
        <a href={imageUrl} target="_blank" rel="noopener noreferrer">
          <img src={imageUrl} alt="Webcam capture" />
        </a>
      )} */}
        <canvas ref={canvasRef} className="face-lines" />
      </div>
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
        onTakePhotoAnimationDone={(dataUri) => {
          handleTakePhotoAnimationDone(dataUri);
        }}
        onCameraError={(error) => {
          handleCameraError(error);
        }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        idealResolution={{ width: 640, height: 480 }}
        imageType={IMAGE_TYPES.JPG}
        imageCompression={0.97}
        isMaxResolution={true}
        isImageMirror={false}
        isSilentMode={false}
        isDisplayStartCameraError={true}
        isFullscreen={false}
        sizeFactor={1}
        onCameraStart={(stream) => {
          handleCameraStart(stream);
        }}
        onCameraStop={() => {
          handleCameraStop();
        }}
      />
    </div>
  );
}

export default TakeSnapFunction;
