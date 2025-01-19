import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert } from "@nextui-org/react";

const AlertInstance = ({ color, title, description, duration, onClose, action, className }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <Alert
      color={color}
      title={title}
      variant="faded"
      className={`transition-opacity duration-1000 ${className}`}
      action={action}
      onClose={onClose}
    >
      {description}
    </Alert>
  );
};

AlertInstance.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  action: PropTypes.node,
  className: PropTypes.string,
};

export default AlertInstance;