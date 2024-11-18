import cv2
import numpy as np
import app.services.Utlis as utils

############################################################################################################
path = 'OMR-API/app/data/firstPart2.png'
widthImg = int(515 / 1)
highImg = int(1529 / 1)
############################################################################################################


img = cv2.imread(path)

# Preprocessing
img = cv2.resize(img, (widthImg, highImg))
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
# secondContour = utils.getConrnerPoints(rectCon[1])
# print(biggestContour)

if biggestContour.size != 0:
    cv2.drawContours(imgBiggestCountours, biggestContour, -1, (0, 255, 0),20)
    # cv2.drawContours(imgBiggestCountours, secondContour, -1, (255, 0, 0), 20)



# imageArray = ([img, imgGray, imgBlur, imgCanny],
#               [imgCountours, np.zeros_like(img),np.zeros_like(img),np.zeros_like(img)])
imageArray = ([imgCountours, imgBiggestCountours,np.zeros_like(img),np.zeros_like(img)])

imgStacked = utils.stackImages(imageArray, 0.5)

cv2.imshow('Stacked Images', imgStacked)
cv2.waitKey(0)
