import React, { useRef, useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Platform } from "react-native";
import Webcam from "react-webcam";
import jsAruco from "js-aruco";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";

const markerTextMapping = {
  0: "Wilhelm Jordan was an important geodesist from Germany...",
  1: "Matthaeus Haid was a notable German geodesist...",
  2: "Martin Näbauer was a German geodesist...",
  3: "Adolf Schlötzer was a German geodesist...",
  4: "Heinrich Merkel was a German geodesist...",
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlayCanvas: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
  },
});

// Component to render a 3D Box
const MarkerBox = ({ corners }) => {
  const ref = useRef();

  useFrame(() => {
    if (ref.current && corners.length === 4) {
      // Convert 2D points to 3D space
      const [p1, p2, p3, p4] = corners.map((c) => new THREE.Vector3(c.x, c.y, 0));

      // Calculate center
      const center = new THREE.Vector3().addVectors(p1, p3).multiplyScalar(0.5);
      ref.current.position.set(center.x, -center.y, -50); // Adjust Z-depth
      ref.current.lookAt(new THREE.Vector3(center.x, -center.y, 0)); // Face the camera
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[100, 100, 10]} /> {/* Box dimensions */}
      <meshStandardMaterial color="red" wireframe />
    </mesh>
  );
};

export default function CameraScreen({ onIdDetected }) {
  const [markersDetected, setMarkersDetected] = useState([]);
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const processFrameWeb = useCallback(() => {
    const videoElement = webcamRef.current?.video;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (videoElement && videoElement.videoHeight && videoElement.videoWidth) {
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      try {
        const detector = new jsAruco.AR.Detector();
        const markers = detector.detect(imgData);

        if (markers.length > 0) {
          setMarkersDetected(markers);
          if (onIdDetected) onIdDetected(markers.map((marker) => marker.id));
        }
      } catch (error) {
        console.error("Error detecting markers:", error);
      }
    }
  }, [onIdDetected]);

  useEffect(() => {
    if (Platform.OS === "web") {
      const interval = setInterval(() => processFrameWeb(), 100);
      return () => clearInterval(interval);
    }
  }, [processFrameWeb]);

  return (
    <View style={styles.container}>
      <Webcam
        audio={false}
        mirrored={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{ facingMode: "environment" }}
      />
      <canvas ref={canvasRef} style={styles.overlayCanvas} />

      {/* 3D Overlay with Three.js */}
      <Canvas className="absolute top-0 left-0 w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 0, 5]} />
        {markersDetected.map((marker, index) => (
          <MarkerBox key={index} corners={marker.corners} />
        ))}
      </Canvas>
    </View>
  );
}
