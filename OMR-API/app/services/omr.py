from app.services.omrServices import calculate_rectangle_height, find_two_biggest_contours, preprocess_image_path, preprocess_image, find_contours, find_biggest_contour, warp_perspective, apply_threshold, process_boxes, stack_images
import cv2

def do_omr(path):
    # Constants for image dimensions
    widthImg = int(2480 / 2)
    heightImg = int(3508 / 2)

    # Preprocess the image
    img, imgCanny = preprocess_image_path(path, widthImg, heightImg)

    # Find contours
    contours = find_contours(imgCanny)
    
    # Get biggest contour height
    biggestContour = find_biggest_contour(contours)
    height = calculate_rectangle_height(biggestContour)
    
    imgContours = img.copy()
    cv2.drawContours(imgContours, contours, -1, (0, 255, 0), 10)

    # Find the biggest contour
    biggestContour = find_two_biggest_contours(contours)
    
    # If no contours were detected
    if len(biggestContour) < 1:
        return "No contours were detected"
    
    print("Two contours was detected")
    imgBiggestContours = img.copy()
    cv2.drawContours(imgBiggestContours, [biggestContour[0]], -1, (0, 255, 0), 20)
    imgWarpColored = warp_perspective(img, biggestContour[0], widthImg, heightImg)
    
    imgCanny2 = imgCanny # Just to avoid errors
    imgBiggestContours2 = imgBiggestContours
    if height > 1000 and height < 2000 :
        img2 = imgWarpColored
        img2, imgCanny2 = preprocess_image(img2, widthImg, heightImg)
    
        # Find contours
        contours2 = find_contours(imgCanny2)
        imgContours2 = img2.copy()
        cv2.drawContours(imgContours2, contours2, -1, (0, 255, 0), 10)
        biggestContour2 = find_biggest_contour(contours2)
        if biggestContour2 is not None and len(biggestContour2) >= 1:
            imgBiggestContours2 = img2.copy()
            cv2.drawContours(imgBiggestContours2, [biggestContour2], -1, (0, 255, 0), 20)
            imgWarpColored = warp_perspective(img2, biggestContour2, widthImg, heightImg)

    elif height < 200:
        return "The maximum height of the rectangle is 200 which is too small"
        
    # Apply threshold
    imgThresh = apply_threshold(imgWarpColored)
    
    # Process boxes and get answers
    answers = process_boxes(imgThresh, 22)
    print("Answers:", answers)
    
    # Stack images for visualization
    imageArray = [
        [img, imgContours, imgCanny, imgBiggestContours],
        [imgWarpColored, imgBiggestContours2 , imgCanny2, imgThresh]
    ]
    
    imgStacked = stack_images(imageArray, 0.2)
    # Show results
    cv2.imshow('Stacked Images', imgStacked)
    cv2.waitKey(0)
    cv2.destroyAllWindows()