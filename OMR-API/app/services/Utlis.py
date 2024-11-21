import cv2
import numpy as np
 
def resizeAndCropImage(img):
    """
    Resizes an image to A4 size and crops it according to specified constants.
    """
    
    # A4 dimensions in pixels at 300 dpi
    A4_WIDTH = 2480 
    A4_HEIGHT = 3508 
    
    if img is None:
        return ValueError("Image is None")
    
    resized_img = cv2.resize(img, (A4_WIDTH, A4_HEIGHT), interpolation=cv2.INTER_AREA)
    
    x, y, width, height = 105, 1700, 389, 1524
    cropped_image = resized_img[y:y+height, x:x+width]
    return cropped_image
 
## TO STACK ALL THE IMAGES IN ONE WINDOW
def stackImages(imgArray,scale,lables=[]):
    rows = len(imgArray)
    cols = len(imgArray[0])
    rowsAvailable = isinstance(imgArray[0], list)
    width = imgArray[0][0].shape[1]
    height = imgArray[0][0].shape[0]
    if rowsAvailable:
        for x in range ( 0, rows):
            for y in range(0, cols):
                imgArray[x][y] = cv2.resize(imgArray[x][y], (0, 0), None, scale, scale)
                if len(imgArray[x][y].shape) == 2: imgArray[x][y]= cv2.cvtColor( imgArray[x][y], cv2.COLOR_GRAY2BGR)
        imageBlank = np.zeros((height, width, 3), np.uint8)
        hor = [imageBlank]*rows
        hor_con = [imageBlank]*rows
        for x in range(0, rows):
            hor[x] = np.hstack(imgArray[x])
            hor_con[x] = np.concatenate(imgArray[x])
        ver = np.vstack(hor)
        ver_con = np.concatenate(hor)
    else:
        for x in range(0, rows):
            imgArray[x] = cv2.resize(imgArray[x], (0, 0), None, scale, scale)
            if len(imgArray[x].shape) == 2: imgArray[x] = cv2.cvtColor(imgArray[x], cv2.COLOR_GRAY2BGR)
        hor= np.hstack(imgArray)
        hor_con= np.concatenate(imgArray)
        ver = hor
    if len(lables) != 0:
        eachImgWidth= int(ver.shape[1] / cols)
        eachImgHeight = int(ver.shape[0] / rows)
        print(eachImgHeight)
        for d in range(0, rows):
            for c in range (0,cols):
                cv2.rectangle(ver,(c*eachImgWidth,eachImgHeight*d),(c*eachImgWidth+len(lables[d])*13+27,30+eachImgHeight*d),(255,255,255),cv2.FILLED)
                cv2.putText(ver,lables[d],(eachImgWidth*c+10,eachImgHeight*d+20),cv2.FONT_HERSHEY_COMPLEX,0.7,(255,0,255),2)
    return ver
 
def reorder(myPoints):
 
    myPoints = myPoints.reshape((4, 2))
    myPointsNew = np.zeros((4, 1, 2), dtype=np.int32)
    add = myPoints.sum(1)
 
    myPointsNew[0] = myPoints[np.argmin(add)]
    myPointsNew[3] =myPoints[np.argmax(add)]
    diff = np.diff(myPoints, axis=1)
    myPointsNew[1] =myPoints[np.argmin(diff)]
    myPointsNew[2] = myPoints[np.argmax(diff)]
 
    return myPointsNew
 
 
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
        # print("Area", area)
        if area > 50:
            peri = cv2.arcLength(i, True)
            approx = cv2.approxPolyDP(i, 0.02 * peri, True)
            # print("Corner Points", len(approx))
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