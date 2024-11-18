import cv2
import numpy as np
import app.services.Utlis as utils

############################################################################################################
path = 'OMR-API/app/data/secondPart.png'
widthImg = int(2486 / 2.5)
highImg = int(3488 / 2.5)
############################################################################################################


img = cv2.imread(path)

img = cv2.resize(img, (widthImg, highImg))
imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)
imgCanny = cv2.Canny(imgBlur, 10, 50)

imageArray = ([img, imgGray, imgBlur, imgCanny])

imgStacked = utils.stackImages(imageArray, 0.5)

cv2.imshow('Stacked Images', imgStacked)
cv2.waitKey(0)

