import cv2
import numpy as np
from fastapi import HTTPException
import app.services.Utlis as utils

def preprocess_image_path(path: str, width: int, height: int) -> tuple:
    """
    Loads an image from file path and preprocesses it.
    Converts the image to grayscale, applies Gaussian blur, and Canny edge detection.
    
    Parameters:
    - path (str): Path to the image file.
    - width (int): Desired width of the image.
    - height(int): Desired height of the image.
    
    Returns:
    - tuple: Resized original image and its Canny edge version. 
    """
    try:
        img = cv2.imread(path)
        if img is None:
            raise FileNotFoundError(f"File not found at path: {path}")
        img = cv2.resize(img, (width, height))
        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)
        imgCanny = cv2.Canny(imgBlur, 10, 50)
        return img, imgCanny
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error preprocess_image_path: {e}")

def preprocess_image(img: np.ndarray, width: int, height: int) -> tuple:
    """
    Preprocesses an input image.
    Converts the image to grayscale, applies Gaussian blur, and Canny edge detection.
    
    Parameters:
    - img (np.ndarray): Input image to preprocess.
    - width (int): Desired width of the image.
    - height (int): Desired height of the image.
    
    Returns:
    - tuple: Resized original image and its Canny edge version.
    """
    try:
        img = cv2.resize(img, (width, height))
        imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        imgBlur = cv2.GaussianBlur(imgGray, (5, 5), 1)
        imgCanny = cv2.Canny(imgBlur, 10, 50)
        return img, imgCanny
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in preprocess_image: {e}")
    
def find_contours(imgCanny: np.ndarray) -> list:
    """
    Finds contours from a preprocessed Canny image.
    
    Parameters:
    - imgCanny (np.ndarray): Canny edge image.
    
    Returns:
    - list: List of contours.
    """
    try:
        contours, _ = cv2.findContours(imgCanny, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
        return contours
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in find_contours: {e}")
    
def calculate_rectangle_dimensions(biggest_contour: np.ndarray) -> tuple:
    """
    Calculates the height and width of the rectangle contour.
    
    Parameters:
    - biggest_contour (np.ndarray): Biggest rectangle contour.
    
    Returns:
    - tuple: Height and width of the rectangle. or (None, None) if the contour is invalid.
    """
    try:
        if biggest_contour is None or len(biggest_contour) != 4:
            return None, None  # Invalid contour data

        # Assuming points are ordered correctly: top-left, top-right, bottom-right, bottom-left
        top_left = biggest_contour[0]
        top_right = biggest_contour[1]
        bottom_left = biggest_contour[3]

        # Calculate the width as the distance between top-left and top-right
        width = np.linalg.norm(top_right - top_left)

        # Calculate the height as the distance between top-left and bottom-left
        height = np.linalg.norm(bottom_left - top_left)

        return height, width
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in calculate_rectangle_dimensions: {e}")

def find_biggest_contour(contours: list) -> np.ndarray:
    """
    Finds and orders the biggest rectangle contour.
    
    Parameters:
    - contours (list): List of contours.
    
    Returns:
    - np.ndarray: Points of the biggest rectangle contour, or None if not valid contour is found.
    """
    try:
        rectCon = utils.rectCounter(contours)
        if rectCon:
            biggestContour = utils.getConrnerPoints(rectCon[0])
            if biggestContour.size != 0:
                return utils.reorder(biggestContour)
        return None
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in find_biggest_contour: {e}")

def find_two_biggest_contours(contours) -> list:
    """
    Finds and returns the two biggest rectangle-like contours.
    
    Parameters:
    - contours (list): List of contours.
    
    Returns:
    - list: Two largest rectangle-like contours, ordered.
    """
    try:
        rectCon = utils.rectCounter(contours)  # Get rectangle-like contours sorted by area
        biggest_contours = []

        for i in range(min(2, len(rectCon))):  # Process only up to 2 biggest contours
            contour = utils.getConrnerPoints(rectCon[i])
            if contour.size != 0:
                biggest_contours.append(utils.reorder(contour))
    
        return biggest_contours
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in find_two_biggest_contours: {e}")

def warp_perspective(img, biggestContour, width, height) -> np.ndarray:
    """
    Applies a perspective warp to the image.
    
    Parameters:
    - img (np.ndarray): Input image to warp.
    - biggestContour (np.ndarray): Points of the biggest rectangle contour.
    - width (int): Desired width of the warped image.
    - height (int): Desired height of the warped image.
    
    Returns:
    - np.ndarray: Warped image.
    """
    try:
        pt1 = np.float32(biggestContour)
        pt2 = np.float32([[0, 0], [width, 0], [0, height], [width, height]])
        matrix = cv2.getPerspectiveTransform(pt1, pt2)
        return cv2.warpPerspective(img, matrix, (width, height))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in warp_perspective: {e}")

def apply_threshold(imgWarpColored):
    """Applies a threshold to the warped image."""
    imgWarpGray = cv2.cvtColor(imgWarpColored, cv2.COLOR_BGR2GRAY)
    return cv2.threshold(imgWarpGray, 170, 255, cv2.THRESH_BINARY_INV)[1]

def process_boxes(imgThresh, num_boxes, which_page, answers_dict):
    """
    Splits the thresholded image into boxes and checks answers.

    Parameters:
    - imgThresh: Thresholded image to process.
    - num_boxes: Number of boxes to process.
    - which_page: Indicates which page is being processed (1 or 2).
    - answers_dict: Dictionary to store the answers.
    """
    # Determine the starting key based on the page number
    start_key = 1 if which_page == 1 else 23

    # Split the thresholded image into boxes
    boxes = utils.splitBoxes(imgThresh, num_boxes)

    # Process each group of 3 boxes
    for i in range(0, len(boxes), 3):
        # Calculate non-zero pixel counts for the current group of boxes
        counts = [
            cv2.countNonZero(boxes[i]),
            cv2.countNonZero(boxes[i + 1]),
            cv2.countNonZero(boxes[i + 2]),
        ]

        # Sort counts in descending order
        counts_sorted = sorted(counts, reverse=True)

        # Determine the selected answer
        if counts_sorted[0] - counts_sorted[1] > 200:  # Valid answer threshold
            selected_box = counts.index(counts_sorted[0]) + 1
            reversed_box = 4 - selected_box  # Reverse the mapping (1->3, 2->2, 3->1)
            answers_dict[start_key] = reversed_box
        else:
            answers_dict[start_key] = 0  # Uncertain or invalid answer

        # Increment the key for the next answer
        start_key += 1

    return answers_dict


def stack_images(imageArray, scale):
    """Stacks multiple images into a single window."""
    return utils.stackImages(imageArray, scale)