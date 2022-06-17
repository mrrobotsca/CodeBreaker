import React from "react";
import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { createPortal } from 'react-dom'

import Congrats from "../assets/congrats.json";


function Portal({ children }) {
    const modalRoot = document.getElementById('modal-root')
  
    return createPortal(children, modalRoot)
}

const Modal = ({ showModal,toggle,time }) => {

  return (
    showModal &&
    <Portal>
        <Container onClick={toggle}>
            <AnimatePresence>
                <ModalBox
                    initial={{ opacity: 0, y: 60, scale: 0.3 }}
                    animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 300 }
                    }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.6 } }}
                    >
                    <ModalContent
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1, transition: { delay: 1 } }}
                    >
                    <h5>Yayyyy Congratulations</h5>
                    <h5>Completed in{time.minutes}:{time.seconds}</h5>
                    <CloseButton onClick={toggle}>&times;</CloseButton>

                    <Lottie
                        animationData={Congrats} 
                        style={{ height: 300 }}
                        autoplay
                    />
                    </ModalContent>
                </ModalBox>
            </AnimatePresence>
        </Container>
    </Portal>
  );
};

export default Modal;


export const ModalBox = styled(motion.div)`
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.8),
    0 0 0 1px rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 2rem;
  position: relative;
  z-index: 2;
  margin-top: 5rem;
  width: 400px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const ModalContent = styled(motion.div)`
    padding: 2rem 1rem 2rem 1rem;
    display:flex;
    flex-direction: column;
    align-items: center;
    min-height: 30%;
    justify-content: space-around;
`;

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  /* background: #111; */
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  position: absolute;
  flex-direction: column;
  align-items: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  background: none;
  width: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const ToggleButton = styled(motion.button)`
  font-size: 15px;
  color: #fff;
  padding: 0.5rem 0.8rem;
  margin-top: 3rem;
  background: #3bb75e;
  border: none;
  border-radius: 4px;
  text-transform: capitalize;
  cursor: pointer;
`;