import cv2
import numpy as np
import app.services.Utlis as utils

############################################################################################################
path = 'OMR-API/app/data/testing_markes_and_angels/IMG_1018.JPG'
widthImg = int(2480 / 2)
hightImg = int(3508 / 2)
############################################################################################################


img = cv2.imread(path)
# img = utils.resizeAndCropImage(img)

# Preprocessing
img = cv2.resize(img, (widthImg, hightImg))
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
    imgThresh = cv2.threshold(imgWarpGray, 170, 255, cv2.THRESH_BINARY_INV)[1]

    boxes  = utils.splitBoxes(imgThresh, 22, 3, 10) # Splitting the boxes
    # for i, box in enumerate(boxes):
    #     cv2.imshow(f'Box {i}', box)
    #     cv2.waitKey(0)
    #     cv2.destroyAllWindows() 
    # for i in range(0, len(boxes), 3):
    #     print(cv2.countNonZero(boxes[i]), cv2.countNonZero(boxes[i+1]), cv2.countNonZero(boxes[i+2]))
    #     cv2.imshow('Test', boxes[i])
    #     cv2.imshow('Test2', boxes[i+1])
    #     cv2.imshow('Test3', boxes[i+2])
    #     cv2.waitKey(0)
    #     cv2.destroyAllWindows() 

# imageArray = ([img, imgGray, imgBlur, imgCanny],
#               [imgCountours, imgBiggestCountours,imgWarpColored,imgThresh])

# imageArray = ([img, imgGray, imgBlur, imgCanny, imgCountours, imgBiggestCountours,imgWarpColored,imgThresh])

imageArray = ([imgCountours, imgBiggestCountours,imgWarpColored,imgThresh])

imgStacked = utils.stackImages(imageArray, 0.5)

cv2.imshow('Stacked Images', imgStacked)
cv2.waitKey(0)
