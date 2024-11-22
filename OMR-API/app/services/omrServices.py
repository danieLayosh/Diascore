import cv2
import numpy as np
import app.services.Utlis as utils

def preprocess_image_path(path, width, height):
    """Loads and preprocesses the image."""
    img = cv2.imread(path)
    img = cv2.resize(img, (width, height))
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)
    imgCanny = cv2.Canny(imgBlur, 10, 50)
    return img, imgGray, imgBlur, imgCanny

def preprocess_image(img, width, height):
    """Loads and preprocesses the image."""
    img = cv2.resize(img, (width, height))
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)
    imgCanny = cv2.Canny(imgBlur, 10, 50)
    return img, imgGray, imgBlur, imgCanny

def find_contours(imgCanny):
    """Finds contours from a preprocessed Canny image."""
    contours, _ = cv2.findContours(imgCanny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    return contours

def find_biggest_contour(contours):
    """Finds and orders the biggest rectangle contour."""
    rectCon = utils.rectCounter(contours)
    if rectCon:
        biggestContour = utils.getConrnerPoints(rectCon[0])
        if biggestContour.size != 0:
            return utils.reorder(biggestContour)
    return None

def find_two_biggest_contours(contours):
    """Finds and returns the two biggest rectangle-like contours."""
    rectCon = utils.rectCounter(contours)  # Get rectangle-like contours sorted by area
    biggest_contours = []

    for i in range(min(2, len(rectCon))):  # Process only up to 2 biggest contours
        contour = utils.getConrnerPoints(rectCon[i])
        if contour.size != 0:
            biggest_contours.append(utils.reorder(contour))

    return biggest_contours


def warp_perspective(img, biggestContour, width, height):
    """Applies a perspective warp to the image."""
    pt1 = np.float32(biggestContour)
    pt2 = np.float32([[0, 0], [width, 0], [0, height], [width, height]])
    matrix = cv2.getPerspectiveTransform(pt1, pt2)
    return cv2.warpPerspective(img, matrix, (width, height))

def apply_threshold(imgWarpColored):
    """Applies a threshold to the warped image."""
    imgWarpGray = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)
    return cv2.threshold(imgWarpGray, 170, 255, cv2.THRESH_BINARY_INV)[1]

def process_boxes(imgThresh, num_boxes):
    """Splits the thresholded image into boxes and checks answers."""
    boxes = utils.splitBoxes(imgThresh, num_boxes)
    answers = []
    for i in range(0, len(boxes), 3):
        counts = [
            cv2.countNonZero(boxes[i]),
            cv2.countNonZero(boxes[i+1]),
            cv2.countNonZero(boxes[i+2]),
        ]
        counts_sorted = sorted(counts, reverse=True)  # Sort in descending order
        if counts_sorted[0] - counts_sorted[1] > 1000:  # Check if the difference is > 2000
            selected_box = counts.index(counts_sorted[0]) + 1
            reversed_box = 4 - selected_box  # Reverse the mapping
            answers.append(reversed_box)
        else:
            answers.append(0)  # Flag it as 0 for uncertainty
    return answers

def stack_images(imageArray, scale):
    """Stacks multiple images into a single window."""
    return utils.stackImages(imageArray, scale)