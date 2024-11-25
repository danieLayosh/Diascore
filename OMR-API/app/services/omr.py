import app.services.omrServices as omr
import cv2

def do_omr(path):
    # Constants for image dimensions
    widthImg = int(2480 / 2)
    heightImg = int(3508 / 2)

    # Step 1: Preprocess the image
    img, imgCanny = omr.preprocess_image_path(path, widthImg, heightImg)

    # Step 2: Find contours
    contours = omr.find_contours(imgCanny)
    imgContours = img.copy()
    cv2.drawContours(imgContours, contours, -1, (0, 255, 0), 10)

    # Step 3: Find the two biggest contours
    biggestContours = omr.find_two_biggest_contours(contours)
    if len(biggestContours) < 1:
        return "No contours were detected"

    print("Two contours were detected")
    imgBiggestContours = img.copy()
    cv2.drawContours(imgBiggestContours, [biggestContours[0]], -1, (0, 255, 0), 20)

    # Step 4: Warp perspective for the first contour
    imgWarpColored = omr.warp_perspective(img, biggestContours[0], widthImg, heightImg)

    # Step 5: Calculate the height of the biggest contour
    biggestContour = omr.find_biggest_contour(contours)
    height = omr.calculate_rectangle_height(biggestContour)

    # Step 6: Handle specific height cases
    imgCanny2, imgBiggestContours2 = imgCanny, imgBiggestContours
    if 1000 < height < 2000:
        imgWarpColored, imgCanny2, imgBiggestContours2 = process_second_contour(imgWarpColored, widthImg, heightImg)
    elif height < 200:
        return "The maximum height of the rectangle is 200, which is too small"

    # Step 7: Apply threshold to warped image
    imgThresh = omr.apply_threshold(imgWarpColored)

    # Step 8: Process boxes to extract answers
    answers = omr.process_boxes(imgThresh, 22)
    print("Answers:", answers)

    # Step 9: Stack images for visualization
    imageArray = [
        [img, imgContours, imgCanny, imgBiggestContours],
        [imgWarpColored, imgBiggestContours2, imgCanny2, imgThresh]
    ]
    imgStacked = omr.stack_images(imageArray, 0.2)

    # Step 10: Display stacked images
    cv2.imshow('Stacked Images', imgStacked)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def process_second_contour(imgWarpColored, widthImg, heightImg):
    """
    Processes the second contour when the height is within a specific range.
    """
    img2, imgCanny2 = omr.preprocess_image(imgWarpColored, widthImg, heightImg)
    contours2 = omr.find_contours(imgCanny2)

    imgContours2 = img2.copy()
    cv2.drawContours(imgContours2, contours2, -1, (0, 255, 0), 10)

    biggestContour2 = omr.find_biggest_contour(contours2)
    if biggestContour2 is not None and len(biggestContour2) >= 1:
        imgBiggestContours2 = img2.copy()
        cv2.drawContours(imgBiggestContours2, [biggestContour2], -1, (0, 255, 0), 20)
        imgWarpColored = omr.warp_perspective(img2, biggestContour2, widthImg, heightImg)
        return imgWarpColored, imgCanny2, imgBiggestContours2

    return imgWarpColored, imgCanny2, imgContours2
