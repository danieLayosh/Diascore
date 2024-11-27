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
    - np.ndarray: Stacked image.
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
 
def biggestContour(contours: list) -> np.ndarray:
    """
    Finds the biggest 4-sided contour in the given list of contours.
    
    Parameters:
    - contours (list): List of contours.
    
    Returns:
    - tuple: The biggest contour (np.ndarray) and its area.
    """
    try:
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in biggestContour: {e}")
    
def drawRectangle(img: np.ndarray, points: np.ndarray, thickness: int) -> np.ndarray:
    """
    Draws a rectangle around the given points on an image.
    
    Parameters:
    - img (np.ndarray): Input image.
    - points (np.ndarray): Points of the rectangle (4 points).
    - thickness (int): Thickness of the rectangle lines.
    
    Returns:
    - np.ndarray: Image with the rectangle drawn.
    """
    try:
        cv2.line(img, tuple(points[0][0]), tuple(points[1][0]), (0, 255, 0), thickness)
        cv2.line(img, tuple(points[0][0]), tuple(points[2][0]), (0, 255, 0), thickness)
        cv2.line(img, tuple(points[3][0]), tuple(points[2][0]), (0, 255, 0), thickness)
        cv2.line(img, tuple(points[3][0]), tuple(points[1][0]), (0, 255, 0), thickness)
        return img
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in drawRectangle: {e}")
 
def nothing(x):
    pass
 
def initializeTrackbars(initial_values=0) -> None:
    """
    Initializes trackbars for threshold adjustment.
    
    Parameters:
    - initial_values (int): Initial value for trackbars.
    """
    try:
        cv2.namedWindow("Trackbars")
        cv2.resizeWindow("Trackbars", 360, 240)
        cv2.createTrackbar("Threshold1", "Trackbars", 200,255, nothing)
        cv2.createTrackbar("Threshold2", "Trackbars", 200, 255, nothing)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in initializeTrackbars: {e}")
    
def valTrackbars():
    """
    Reads the current positions of the trackbars.
    
    Returns:
    - tuple: Threshold1 and Threshold2 values.
    """
    try:
        threshold1 = cv2.getTrackbarPos("Threshold1", "Trackbars")
        threshold2 = cv2.getTrackbarPos("Threshold2", "Trackbars")
        return threshold1, threshold2
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in valTrackbars: {e}")

def rectCounter(contours: list) -> list:
    """
    Filters contours to find rectangle-like shapes.
    
    Parameters:
    - contours (list): List of contours.
    
    Returns:
    - list: Rectangle-like contours sorted by area (descending).
    """
    try:
        rectCon = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area > 50:
                peri = cv2.arcLength(contour, True)
                approx = cv2.approxPolyDP(contour, 0.02 * peri, True)
                if len(approx) == 4:  # Rectangle
                    rectCon.append(contour)

        rectCon = sorted(rectCon, key=cv2.contourArea, reverse=True)
        return rectCon
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in rectCounter: {e}")

def getConrnerPoints(contour) -> np.ndarray:
    """
    Extracts corner points from a contour.
    
    Parameters:
    - contour (np.ndarray): Input contour.
    
    Returns:
    - np.ndarray: Approximated corner points.
    """
    try:
        peri = cv2.arcLength(contour, True)
        approx = cv2.approxPolyDP(contour, 0.02 * peri, True)
        return approx
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in getConrnerPoints: {e}")

def reorder(points):
    """
    Reorders points to a consistent top-left, top-right, bottom-right, bottom-left order.
    
    Parameters:
    - points (np.ndarray): Input 4 points (e.g., contour corners).
    
    Returns:
    - np.ndarray: Reordered points.
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

def splitBoxes(img: np.ndarray, num_rows: int, row_padding=5) -> list:
    """
    Splits the image into equally sized boxes with optional padding.
    
    Parameters:
    - img (np.ndarray): Input image.
    - num_rows (int): Number of rows to split into.
    - row_padding (int): Extra pixels added to each row split.
    
    Returns:
    - list: List of cropped image boxes.
    """
    try:
        h, w = img.shape
        row_height = h / num_rows
        col_width = w / 3

        boxes = []
        for row in range(num_rows):
            for col in range(3):
                y1 = round(row * row_height)
                y2 = round((row + 1) * row_height) + row_padding
                x1 = round(col * col_width)
                x2 = round((col + 1) * col_width)

                # Ensure coordinates are within bounds
                y1, y2 = max(0, min(h, y1)), max(0, min(h, y2))
                x1, x2 = max(0, min(w, x1)), max(0, min(w, x2))

                box = img[y1:y2, x1:x2]
                boxes.append(box)

        return boxes
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in splitBoxes: {e}")
    
def ensure_vertical_orientation(image: np.ndarray) -> np.ndarray:
    """
    Ensures that the image is vertical (portrait). If the image is in landscape orientation,
    it rotates the image to make it vertical.

    Parameters:
        image (np.ndarray): The input image as a numpy array.

    Returns:
        np.ndarray: The rotated image (if necessary), otherwise the original image.
    """
    # Get the dimensions of the image (height, width)
    height, width = image.shape[:2]
    
    if width > height:
        # Rotate the image 90 degrees counterclockwise to make it vertical
        image = cv2.rotate(image, cv2.ROTATE_90_CLOCKWISE)
    
    return image