import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
} from "@chakra-ui/react";

const InstaModal = ({ isOpen, onClose, modalContent, modalTitle }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{modalTitle}</ModalHeader>
                <ModalCloseButton />
                {modalContent}
            </ModalContent>
        </Modal>
    );
};

export default InstaModal;
