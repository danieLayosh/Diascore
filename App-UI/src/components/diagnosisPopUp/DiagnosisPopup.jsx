import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@heroui/react";
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from '../../utils';
 
export const DiagnosisPopup = ({ isOpen, onClose, diagnosis }) => {
    return (
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Diagnosis Details</ModalHeader>
              <ModalBody>
                {diagnosis ? (
                    <div>
                        {Object.entries(diagnosis)
                        .filter(([key]) => !["id", "avatar", "therapistID"].includes(key))
                        .map(([key, value]) => (
                            <p key={key}>
                                <strong>{capitalizeFirstLetter(key)}:</strong> {capitalizeFirstLetter(String(value))}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
};

DiagnosisPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    diagnosis: PropTypes.shape({
        patientName: PropTypes.string,
        diagnosisDate: PropTypes.string,
        status: PropTypes.string,
    }),
};
  