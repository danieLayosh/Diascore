import { useContext } from "react";
import AlertContext from "../../context/AlertContext";
import { Button } from "@nextui-org/react";
import AlertInstance from "./AlertInstance";

const GlobalAlert = () => {
  const { alerts, closeAlert } = useContext(AlertContext);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-center">
      <div className="w-96">
        {alerts.map((alert) => (
          <AlertInstance
            key={alert.id}
            color={alert.type === "success" ? "success" : "danger"}
            title={alert.type === "success" ? "Success" : "Error"}
            description={alert.message}
            variant="faded"
            duration={alert.duration}
            onClose={() => closeAlert(alert.id)}
            action={<Button size="sm" auto onPress={() => closeAlert(alert.id)}>Close</Button>}
            // className={`transition-opacity duration-1000`}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalAlert;