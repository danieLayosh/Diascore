// src/components/alerts/GlobalAlert.jsx
import { useEffect } from "react";
import useAlert from "../../context/useAlert";

const GlobalAlert = () => {
  const { alertDetails, showAlert } = useAlert();

  useEffect(() => {
    if (alertDetails.message) {
      const timer = setTimeout(() => {
        showAlert("", ""); // Clear alert after 5 seconds
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [alertDetails, showAlert]);

  if (!alertDetails.message) return null;

  return (
    <div
      className={`fixed top-0 left-0 right-0 p-4 ${
        alertDetails.type === "success" ? "bg-green-500" : "bg-red-500"
      } text-white text-center font-bold shadow-lg z-50`}
    >
      {alertDetails.message}
    </div>
  );
};

export default GlobalAlert;