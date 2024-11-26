import cv2
import numpy as np
from fastapi import HTTPException
 
## TO STACK ALL THE IMAGES IN ONE WINDOW
def stackImages(imgArray: list, scale: float, labels=[]) -> np.ndarray:
    """
    Stacks multiple images into one display window with optional labels.
    
    Parameters:
    - imgArray (list): 2D list of images to stack (rows x columns).
    - scale (float): Scaling factor for resizing images.
    - labels (list): Labels for rows of images (optional).
    
    Returns:
    - numpy.ndarray: Stacked image.
    """
    try:
        rows = len(imgArray)
        cols = len(imgArray[0])
        rowsAvailable = isinstance(imgArray[0], list)
        width = imgArray[0][0].shape[1]
        height = imgArray[0][0].shape[0]

        if rowsAvailable:
            for x in range(rows):
                for y in range(cols):
                    imgArray[x][y] = cv2.resize(imgArray[x][y], (0, 0), None, scale, scale)
                    if len(imgArray[x][y].shape) == 2:  # If grayscale, convert to BGR
                        imgArray[x][y] = cv2.cvtColor(imgArray[x][y], cv2.COLOR_GRAY2BGR)

            imageBlank = np.zeros((height, width, 3), np.uint8)
            hor = [imageBlank] * rows
            for x in range(rows):
                hor[x] = np.hstack(imgArray[x])
            ver = np.vstack(hor)
        else:
            for x in range(rows):
                imgArray[x] = cv2.resize(imgArray[x], (0, 0), None, scale, scale)
                if len(imgArray[x].shape) == 2:  # If grayscale, convert to BGR
                    imgArray[x] = cv2.cvtColor(imgArray[x], cv2.COLOR_GRAY2BGR)
            ver = np.hstack(imgArray)

        # Add labels if provided
        if labels:
            eachImgWidth = ver.shape[1] // cols
            eachImgHeight = ver.shape[0] // rows
            for d in range(rows):
                for c in range(cols):
                    cv2.rectangle(
                        ver,
                        (c * eachImgWidth, d * eachImgHeight),
                        (c * eachImgWidth + len(labels[d]) * 13 + 27, d * eachImgHeight + 30),
                        (255, 255, 255), cv2.FILLED
                    )
                    cv2.putText(
                        ver, labels[d],
                        (eachImgWidth * c + 10, eachImgHeight * d + 20),
                        cv2.FONT_HERSHEY_COMPLEX, 0.7, (255, 0, 255), 2
                    )

        return ver
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in stackImages: {e}")
 
def reorder(points: np.ndarray) -> np.ndarray:
    """
    Reorders points to a consistent top-left, top-right, bottom-right, bottom-left order.
    
    Parameters:
    - points (numpy.ndarray): Input 4 points (e.g., contour corners).
    
    Returns:
    - numpy.ndarray: Reordered points.
    """
    try:
        points = points.reshape((4, 2))
        reordered = np.zeros((4, 1, 2), dtype=np.int32)
        add = points.sum(1)
        diff = np.diff(points, axis=1)

        reordered[0] = points[np.argmin(add)]  # Top-left
        reordered[3] = points[np.argmax(add)]  # Bottom-right
        reordered[1] = points[np.argmin(diff)]  # Top-right
        reordered[2] = points[np.argmax(diff)]  # Bottom-left

        return reordered
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in reorder: {e}")
 
def biggestContour(contours):
    biggest = np.array([])
    max_area = 0
    for i in contours:
        area = cv2.contourArea(i)
        if area > 5000:
            peri = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i, 0.02 * peri, True)
            if area > max_area and len(approx) == 4:
                biggest = approx
                max_area = area
    return biggest,max_area

def drawRectangle(img,biggest,thickness):
    cv2.line(img, (biggest[0][0][0], biggest[0][0][1]), (biggest[1][0][0], biggest[1][0][1]), (0, 255, 0), thickness)
    cv2.line(img, (biggest[0][0][0], biggest[0][0][1]), (biggest[2][0][0], biggest[2][0][1]), (0, 255, 0), thickness)
    cv2.line(img, (biggest[3][0][0], biggest[3][0][1]), (biggest[2][0][0], biggest[2][0][1]), (0, 255, 0), thickness)
    cv2.line(img, (biggest[3][0][0], biggest[3][0][1]), (biggest[1][0][0], biggest[1][0][1]), (0, 255, 0), thickness)
 
    return img
 
def nothing(x):
    pass
 
def initializeTrackbars(intialTracbarVals=0):
    cv2.namedWindow("Trackbars")
    cv2.resizeWindow("Trackbars", 360, 240)
    cv2.createTrackbar("Threshold1", "Trackbars", 200,255, nothing)
    cv2.createTrackbar("Threshold2", "Trackbars", 200, 255, nothing)
 
def valTrackbars():
    Threshold1 = cv2.getTrackbarPos("Threshold1", "Trackbars")
    Threshold2 = cv2.getTrackbarPos("Threshold2", "Trackbars")
    src = Threshold1,Threshold2
    return src

def rectCounter(contours):
    
    rectCon = []
    for i in contours:
        area = cv2.contourArea(i)
        if area > 50:
            peri = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i, 0.02 * peri, True)
            if len(approx) == 4:
                rectCon.append(i)
                
    rectCon = sorted(rectCon, key=cv2.contourArea, reverse=True)
    
    return rectCon

def getConrnerPoints(cont):
    peri = cv2.arcLength(cont, True)
    approx = cv2.approxPolyDP(cont, 0.02 * peri, True)
    return approx

def reorder(myPoints):
    myPoints = myPoints.reshape((4, 2))
    myPointsNew = np.zeros((4, 1, 2), np.int32)
    add = myPoints.sum(1)
    myPointsNew[0] = myPoints[np.argmin(add)] # [0 , 0]
    myPointsNew[3] = myPoints[np.argmax(add)] # [w , h]
    diff = np.diff(myPoints, axis=1)
    myPointsNew[1] = myPoints[np.argmin(diff)] # [w , 0]
    myPointsNew[2] = myPoints[np.argmax(diff)] # [0 , h]
    
    return myPointsNew

def splitBoxes(img, num_rows, row_padding=5):
    """
    Splits the image into equally sized boxes, with optional row padding for better coverage.
    
    :param img: The input image (grayscale or binary).
    :param num_rows: Number of rows to split into.
    :param row_padding: Extra pixels added to each row split to extend downward.
    :return: List of cropped image boxes.
    """
    h, w = img.shape
    row_height = h / num_rows  # Compute row height as float
    col_width = w / 3  # Compute column width as float

    boxes = []
    for row in range(num_rows):
        for col in range(3):
            # Compute coordinates for each box
            y1 = round(row * row_height)
            y2 = round((row + 1) * row_height) + row_padding  # Add padding to the bottom
            x1 = round(col * col_width)
            x2 = round((col + 1) * col_width)

            # Ensure the coordinates are within image bounds
            y1 = max(0, min(h, y1))
            y2 = max(0, min(h, y2))
            x1 = max(0, min(w, x1))
            x2 = max(0, min(w, x2))

            # Crop the box from the image
            box = img[y1:y2, x1:x2]
            boxes.append(box)

    return boxes