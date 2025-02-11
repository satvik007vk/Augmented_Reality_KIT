import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import Webcam from "react-webcam"; // For web
import jsAruco from "js-aruco";

const markerTextMapping = {
  0: "Johann Gottfried Tulla (1770–1828) was a German hydraulic engineer best known for straightening the Upper Rhine River to reduce flooding and improve navigation.",
  1: "Wilhelm Jordan (1842–1899) was a German mathematician and geodesist known for the Gauss–Jordan elimination method and advancements in geodetic triangulation.",
  2: "Johannes van Mierlo was a geodesist who contributed to geodetic research at the Karlsruhe Institute of Technology, improving surveying and mapping techniques.",
  3: "Günter Schmitt is a German engineer and businessman, leading Schmitt Gruppe in logistics and transportation innovation.",
  4: "Matthias Haid was a 19th-century German geodesist who played a key role in standardizing surveying and geodetic measurement techniques.",
  5: "Bernhard Heck is a German geodesist recognized for his pioneering work in satellite geodesy and geodetic networks.",
  6: "Heinrich Lichte was a German geodesist who made significant contributions to improving geodetic measurement and land surveying methods.",
  7: "Heinz Draheim was a German geodesist known for advancing theoretical and applied geodesy, particularly in surveying and satellite geodesy.",
  8: "Eugen Kuntz was a German cartographer and geodesist known for his work on cartographic projection techniques.",
  9: "Hermann Maelzer was a German geodesist recognized for his contributions to triangulation and precise Earth measurement techniques.",
  10: "Hans-Georg Wenzel was a German geodesist known for his research in precise geoid determination and satellite geodesy.",
  11: "Martin Näbauer was a German geodesist who contributed to high-precision geodetic measurements and global coordinate systems.",
  12: "Adolf Schlötzer was a German geodesist who worked at the Karlsruhe Institute of Technology, focusing on geodetic network adjustments.",
  13: "Heinrich Merkel was a German geodesist affiliated with the Karlsruhe Institute of Technology, contributing to advancements in land surveying techniques."
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  markerBox: {
    position: "absolute",
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "rgba(255, 0, 0, 0.3)", // Semi-transparent red
  },
  markerTextBox: {
    position: "absolute",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerText: {
    fontSize: 12,
    color: "black",
  },
});

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
          if (onIdDetected) {
            console.log(markers.map((marker) => marker.id));
            
            onIdDetected(markers.map((marker) => marker.id)[0]);
          }
        }

        // Draw bounding boxes
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        markers.forEach((marker) => {
          const { id, corners } = marker;
          context.beginPath();
          context.moveTo(corners[0].x, corners[0].y);
          corners.forEach((corner) => context.lineTo(corner.x, corner.y));
          context.closePath();
          context.lineWidth = 3;
          context.strokeStyle = "red";
          context.stroke();

          // Display text if ID is mapped
          if (markerTextMapping[id]) {
            context.fillStyle = "white";

            // Define text properties
            const text = markerTextMapping[id];
            const maxWidth = 200; // Adjust box width if needed
            const lineHeight = 20;
            const x = corners[0].x;
            const y = corners[0].y - 30;

            // Split text into lines that fit within maxWidth
            const words = text.split(" ");
            let line = "";
            let lines = [];
            
            words.forEach(word => {
              let testLine = line + word + " ";
              let testWidth = context.measureText(testLine).width;
              if (testWidth > maxWidth && line.length > 0) {
                lines.push(line);
                line = word + " ";
              } else {
                line = testLine;
              }
            });
            lines.push(line); // Push the last line

            // Calculate box height dynamically
            const boxHeight = lines.length * lineHeight + 10;

            // Draw background box
            context.fillRect(x, y, maxWidth, boxHeight);

            // Draw text
            context.fillStyle = "black";
            lines.forEach((line, index) => {
              context.fillText(line, x + 5, y + (index + 1) * lineHeight);
            });
          }
        });
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

  if (Platform.OS === "web") {
    return (
      <View style={styles.container}>
        <Webcam
          audio={false}
          mirrored={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "environment" }}
        />
        <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0 }} />
      </View>
    );
  }

  return <View style={styles.container}></View>;
}
