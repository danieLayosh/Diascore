from app.services.omr import preprocess_image, find_contours, find_biggest_contour, warp_perspective, apply_threshold, process_boxes, stack_images
import cv2

def do_omr(path):
    # Constants for image dimensions
    widthImg = int(2480 / 2)
    heightImg = int(3508 / 2)

    # Preprocess the image
    img, imgGray, imgBlur, imgCanny = preprocess_image(path, widthImg, heightImg)

    # Find contours
    contours = find_contours(imgCanny)
    imgContours = img.copy()
    cv2.drawContours(imgContours, contours, -1, (0, 255, 0), 10)

    # Find the biggest contour
    biggestContour = find_biggest_contour(contours)
    if biggestContour is None:
        print("No valid contour found.")
        return

    # Warp perspective
    imgBiggestContours = img.copy()
    cv2.drawContours(imgBiggestContours, [biggestContour], -1, (0, 255, 0), 20)
    imgWarpColored = warp_perspective(img, biggestContour, widthImg, heightImg)

    # Apply threshold
    imgThresh = apply_threshold(imgWarpColored)

    # Process boxes and get answers
    answers = process_boxes(imgThresh, 22)
    print("Answers:", answers)

    # Stack images for visualization
    imageArray = [
        [img, imgGray, imgBlur, imgCanny],
        [imgContours, imgBiggestContours, imgWarpColored, imgThresh]
    ]
    imgStacked = stack_images(imageArray, 0.3)

    # Show results
    cv2.imshow('Stacked Images', imgStacked)
    cv2.waitKey(0)
    cv2.destroyAllWindows()