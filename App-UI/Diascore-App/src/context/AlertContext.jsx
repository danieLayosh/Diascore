// context/AlertContext.js
import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { ALERT_TYPES } from "./alertTypes";

// Create Context
const AlertContext = createContext();

// Provider component to wrap your app
export const AlertProvider = ({ children }) => {
  const [alertDetails, setAlertDetails] = useState({
    message: "",
    type: "",
  });

  const showAlert = (message, type = ALERT_TYPES.INFO) => {
    setAlertDetails({ message, type });
    setTimeout(() => {
      setAlertDetails({ message: "", type: "" });
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alertDetails, showAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertContext;
