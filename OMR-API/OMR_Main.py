import cv2
import numpy as np
import app.services.Utlis as utils

############################################################################################################
path = 'OMR-API/app/data/first_circles_marked.png'
widthImg = 389
hightImg = 1524
############################################################################################################


img = cv2.imread(path)
img = utils.resizeAndCropImage(img)

# Preprocessing
# img = cv2.resize(img, (widthImg, hightImg))
imgCountours = img.copy()
imgBiggestCountours = img.copy()
imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)
imgCanny = cv2.Canny(imgBlur, 10, 50)

# Finding Contours
contours, hierarchy = cv2.findContours(imgCanny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
cv2.drawContours(imgCountours, contours, -1, (0, 255, 0), 10)

# Finding Rectangle
rectCon = utils.rectCounter(contours)
biggestContour = utils.getConrnerPoints(rectCon[0])

if biggestContour.size != 0:
    cv2.drawContours(imgBiggestCountours, biggestContour, -1, (0, 255, 0),20)
    
    biggestContour = utils.reorder(biggestContour)

    pt1 = np.float32(biggestContour)
    pt2 = np.float32([[0, 0], [widthImg, 0], [0, hightImg], [widthImg, hightImg]])
    matrix = cv2.getPerspectiveTransform(pt1, pt2)
    imgWarpColored = cv2.warpPerspective(img, matrix, (widthImg, hightImg))

    # APPLY THRESHOLD
    imgWarpGray = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)
    imgThresh = cv2.threshold(imgWarpGray, 150, 255, cv2.THRESH_BINARY_INV)[1]

# imageArray = ([img, imgGray, imgBlur, imgCanny],
#               [imgCountours, imgBiggestCountours,imgWarpColored,np.zeros_like(img)])

# imageArray = ([img, imgGray, imgBlur, imgCanny, imgCountours, imgBiggestCountours])

imageArray = ([imgCountours, imgBiggestCountours,imgWarpColored,imgThresh])

imgStacked = utils.stackImages(imageArray, 0.5)

cv2.imshow('Stacked Images', imgStacked)
cv2.waitKey(0)
