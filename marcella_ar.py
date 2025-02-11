from imutils.video import VideoStream
import argparse
import imutils
import time
import cv2
import sys

ap = argparse.ArgumentParser()
ap.add_argument("-t", "--type", type=str,
                default="DICT_ARUCO_ORIGINAL",
                help="type of ArUCo tag to detect")
args = vars(ap.parse_args())

# Define names of each possible ArUCo tag OpenCV supports
ARUCO_DICT = {
    "DICT_4X4_50": cv2.aruco.DICT_4X4_50,
    "DICT_4X4_100": cv2.aruco.DICT_4X4_100,
    "DICT_4X4_250": cv2.aruco.DICT_4X4_250,
    "DICT_4X4_1000": cv2.aruco.DICT_4X4_1000,
    "DICT_5X5_50": cv2.aruco.DICT_5X5_50,
    "DICT_5X5_100": cv2.aruco.DICT_5X5_100,
    "DICT_5X5_250": cv2.aruco.DICT_5X5_250,
    "DICT_5X5_1000": cv2.aruco.DICT_5X5_1000,
    "DICT_6X6_50": cv2.aruco.DICT_6X6_50,
    "DICT_6X6_100": cv2.aruco.DICT_6X6_100,
    "DICT_6X6_250": cv2.aruco.DICT_6X6_250,
    "DICT_6X6_1000": cv2.aruco.DICT_6X6_1000,
    "DICT_7X7_50": cv2.aruco.DICT_7X7_50,
    "DICT_7X7_100": cv2.aruco.DICT_7X7_100,
    "DICT_7X7_250": cv2.aruco.DICT_7X7_250,
    "DICT_7X7_1000": cv2.aruco.DICT_7X7_1000,
    "DICT_ARUCO_ORIGINAL": cv2.aruco.DICT_ARUCO_ORIGINAL,
    "DICT_APRILTAG_16h5": cv2.aruco.DICT_APRILTAG_16h5,
    "DICT_APRILTAG_25h9": cv2.aruco.DICT_APRILTAG_25h9,
    "DICT_APRILTAG_36h10": cv2.aruco.DICT_APRILTAG_36h10,
    "DICT_APRILTAG_36h11": cv2.aruco.DICT_APRILTAG_36h11
}

# Verify that the supplied ArUCo tag exists
if ARUCO_DICT.get(args["type"], None) is None:
    print(f"[INFO] ArUCo tag of '{args['type']}' is not supported")
    sys.exit(0)

# Load the ArUCo dictionary and parameters
print(f"[INFO] detecting '{args['type']}' tags...")
arucoDict = cv2.aruco.getPredefinedDictionary(ARUCO_DICT[args["type"]])
arucoParams = cv2.aruco.DetectorParameters()

# Initialize the video stream and allow the camera to warm up
print("[INFO] starting video stream...")
vs = VideoStream(src=0).start()
time.sleep(2.0)

# Define the text appearing next to a certain marker 
marker_text_mapping = {
    0: "Wilhelm Jordan was an important geodesist from Germany. \nHe was born in Ellwangen, Germany, and died in Hannover, Germany. \nAs early as 1868, he became a professor at the newly created Chair \nof Practical Geometry and Higher Geodesy at Stuttgart Polytechnic. \nIn 1871 he became Baden's commissioner at the Vienna Conference of \nthe European Ordnance Survey in Vienna, in 1873 editor of the \nZeitschrift fuer Vermessungswesen and taught in Karlsruhe until 1881.",
    1: "Matthaeus Haid was a notable German geodesist and geophysicist. \nHe was born in Speyer, Germany, and also passed away there. \nIn 1882, he became a professor of Practical Geometry and Higher \nGeodesy at the Polytechnic in Karlsruhe, succeeding Wilhelm Jordan. \nHe made significant contributions to geophysics, including seismic \nand gravity measurements, and developed a pendulum apparatus for \nrelative gravity measurements.",
    2: "Martin Näbauer was a German geodesist. He was born in Blaufeld, \nGermany, and passed away in Munich, Germany.  He studied \ngeodesy at the Technical University of Munich and worked as an \nassistant to Max Carl Ludwig Schmidt. He taught at various institutions, \nincluding Braunschweig and Karlsruhe, and became a professor in \nMunich in 1926. His research focused on least squares adjustment, \nerror theory, and refraction. He was a key figure in the scientific commissions for the Prussian Land Survey and international geodesy.",
    3: "Adolf Schlötzer was a German geodesist and academic. He \ncompleted his dissertation at the University of Munich in 1909. \nHe worked in various areas of geodesy and contributed to the development \nof measurement techniques. Schlötzer was also known for his role \nin the advancement of geodetic research in Germany, influencing \nboth theoretical and practical aspects of the field.", 
    4: "Heinrich Merkel was a German geodesist. He was born in \n1889 and passed away in 1965. Merkel made significant contributions \nto the field of geodesy, focusing on land surveying and geodetic \ntechniques. He was involved in various projects and research, which \nadvanced the understanding of spatial \nmeasurements in Germany.",
}




# Loop over the frames from the video stream
while True:
    # Grab the frame and check if it's valid
    frame = vs.read()
    if frame is None:
        print("[WARNING] Unable to capture frame. Check camera.")
        break

    # Resize the frame for processing
    frame = imutils.resize(frame, width=1000)

    # Detect ArUco markers in the frame
    (corners, ids, rejected) = cv2.aruco.detectMarkers(frame, arucoDict, parameters=arucoParams)
    # Verify at least one ArUCo marker was detected
    if len(corners) > 0:
        ids = ids.flatten()
        print(ids)
        for (markerCorner, markerID) in zip(corners, ids):
            corners = markerCorner.reshape((4, 2))
            (topLeft, topRight, bottomRight, bottomLeft) = corners
            topRight = (int(topRight[0]), int(topRight[1]))
            bottomRight = (int(bottomRight[0]), int(bottomRight[1]))
            bottomLeft = (int(bottomLeft[0]), int(bottomLeft[1]))
            topLeft = (int(topLeft[0]), int(topLeft[1]))

            # Draw the bounding box
            cv2.line(frame, topLeft, topRight, (0, 255, 0), 2)
            cv2.line(frame, topRight, bottomRight, (0, 255, 0), 2)
            cv2.line(frame, bottomRight, bottomLeft, (0, 255, 0), 2)
            cv2.line(frame, bottomLeft, topLeft, (0, 255, 0), 2)

            # Draw the center of the marker
            cX = int((topLeft[0] + bottomRight[0]) / 2.0)
            cY = int((topLeft[1] + bottomRight[1]) / 2.0)
            cv2.circle(frame, (cX, cY), 4, (0, 0, 255), -1)
            
            # Draw the ID of the marker
            cv2.putText(frame, str(markerID), (topLeft[0], topLeft[1] - 15),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
            
            # Draw the Text
            for (markerCorner, markerID) in zip(corners, ids.flatten()):  # Iterate over markers
                if markerID in marker_text_mapping:  # Check if ID exists in the dictionary
                    text = marker_text_mapping[markerID]  # Get the text from the marker_text_mapping

                    lines = text.split("\n") # Split the text into multiple lines 

                    # Define the text position
                    textbox_x = topRight[0] + 20
                    textbox_y = topRight[1] + 20
                    box_width = 600
                    box_height = 150
                    line_height = 20

                    # Draw a text box (rectangle)
                    cv2.rectangle(frame, (textbox_x, textbox_y), (textbox_x + box_width, textbox_y + box_height), (255, 255, 255), -1)
                    

                    # Put text (the multiple lines) into the text box:
                    for i, line in enumerate(lines):
                        text_x = textbox_x + 10 # Add padding
                        text_y = textbox_y + 20 + (i * line_height) # Add padding & offset for each line
                        cv2.putText(frame, line, (text_x, text_y),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 0), 2)



    # Show the output frame
    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF



    # Break the loop if 'q' is pressed
    if key == ord("q"):
        break

# Cleanup
cv2.destroyAllWindows()
vs.stop()
