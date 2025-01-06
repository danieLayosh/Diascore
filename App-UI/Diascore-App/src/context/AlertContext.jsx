import { createContext, useState } from "react";
import PropTypes from "prop-types";

import { ALERT_TYPES } from "./alertTypes";

// Create Context
const AlertContext = createContext();

// TODO Modify the AlertProvider component for more flexibility and clean the mess with GlobalAlert and the context
// Provider component to wrap your app
export const AlertProvider = ({ children }) => {
  const [alertDetails, setAlertDetails] = useState({
    message: "",
    type: "",
  });

  const showAlert = (message, type = ALERT_TYPES.INFO, duration=5000) => {
    setAlertDetails({ message, type });
    setTimeout(() => {
      setAlertDetails({ message: "", type: "" });
    }, duration);
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
