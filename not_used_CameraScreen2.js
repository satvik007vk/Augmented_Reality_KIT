  import React, { useState, useEffect, useCallback, useRef } from 'react';
  import { View, StyleSheet, Text, Platform } from 'react-native';
  import Webcam from 'react-webcam'; // For web
  import jsAruco from 'js-aruco';

  const markerTextMapping = {
    0: "Wilhelm Jordan was an important geodesist from Germany...",
    1: "Matthaeus Haid was a notable German geodesist...",
    2: "Martin Näbauer was a German geodesist...",
    3: "Adolf Schlötzer was a German geodesist...",
    4: "Heinrich Merkel was a German geodesist...",
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    markerTextBox: {
      position: 'absolute',
      backgroundColor: 'white',
      padding: 8,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    markerText: {
      fontSize: 12,
      color: 'black',
    },
  });
  export default function CameraScreen({ onIdDetected }) { // Accept onIdDetected as prop
    const [markersDetected, setMarkersDetected] = useState([]);
    const webcamRef = useRef(null);
    
    const processFrameWeb = useCallback(() => {
      const videoElement = webcamRef.current?.video;
  
      if (videoElement && videoElement.videoHeight && videoElement.videoWidth) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
  
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
  
        try {
          const detector = new jsAruco.AR.Detector();
          const markers = detector.detect(imgData);
          
          if (markers.length > 0) {
            const detectedId = markers[0].id; // Get first detected marker's ID
            console.log("Detected Marker ID:", detectedId);
            setMarkersDetected(markers);
            console.log(`before detected: ${detectedId}`);

            if (onIdDetected) {
              console.log(`detected: ${detectedId}`);

              onIdDetected(detectedId); // Pass detected ID to HomeScreen
            }
          }
        } catch (error) {
          console.error("Error detecting markers:", error);
        }
      }
    }, [onIdDetected]);
  
    useEffect(() => {
      if (Platform.OS === 'web') {
        const interval = setInterval(() => processFrameWeb(), 100);
        return () => clearInterval(interval);
      }
    }, [processFrameWeb]);
  
    if (Platform.OS === 'web') {
      return (
        <View style={styles.container}>
          <Webcam
            audio={false}
            mirrored={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
          />
        </View>
      );
    }
  
    return <View style={styles.container}></View>;
  }

