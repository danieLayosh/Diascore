import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { ALERT_TYPES } from "./alertTypes";

// Create Context
const AlertContext = createContext();

// Provider component to wrap your app
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, type = ALERT_TYPES.INFO, duration = 5000) => {
    const id = Date.now();
    setAlerts((prevAlerts) => [...prevAlerts, { id, message, type, duration }]);

    setTimeout(() => {
      closeAlert(id);
    }, duration);
  };

  const closeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ alerts, showAlert, closeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AlertContext;
