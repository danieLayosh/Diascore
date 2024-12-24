import { useEffect, useState } from "react";
import { Alert, Button } from "@nextui-org/react";
import useAlert from "../../context/useAlert";

const GlobalAlert = () => {
  const { alertDetails, showAlert } = useAlert();
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1); // Start with full opacity

  useEffect(() => {
    if (alertDetails.message) {
      // Reset opacity to 1 when a new alert is shown
      setOpacity(1);
      const fadeOutDuration = 5; // Alert stays visible for 5 seconds
      const fadeOutSpeed = 0.05; // Decrease opacity by 0.05 every 100ms

      const fadeOutTimer = setInterval(() => {
        setOpacity((prev) => {
          if (prev <= 0) {
            clearInterval(fadeOutTimer);
            showAlert("", ""); // Clear alert when it's fully faded
            return 0;
          }
          return prev - fadeOutSpeed;
        });
      }, 100); // Update opacity every 100ms

      const hideTimer = setTimeout(() => {
        clearInterval(fadeOutTimer);
        setIsVisible(false); // Hide the alert once it's fully faded
      }, fadeOutDuration * 1000); // Fade over the specified duration

      return () => {
        clearInterval(fadeOutTimer);
        clearTimeout(hideTimer);
      };
    }
  }, [alertDetails, showAlert]);

  if (!alertDetails.message) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center">
      <div className="w-96">
        <Alert
          isVisible={isVisible}
          color={alertDetails.type === "success" ? "success" : "danger"}
          title={alertDetails.type === "success" ? "Success" : "Error"}
          description={alertDetails.message}
          onClose={() => setIsVisible(false)}
          variant="faded"
          action={<Button size="sm" auto onPress={() => setIsVisible(false)}>Close</Button>}
          className={`transition-opacity duration-1000`}
          style={{
            opacity: opacity, // Set opacity to the value that gradually decreases
          }}
        />
      </div>
    </div>
  );
};

export default GlobalAlert;
