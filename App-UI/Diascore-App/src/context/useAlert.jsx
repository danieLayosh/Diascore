// src/context/useAlert.jsx
import { useContext } from "react";
import AlertContext from "./AlertContext";

// Custom hook to use the alert context
const useAlert = () => {
  return useContext(AlertContext);
};

export default useAlert;