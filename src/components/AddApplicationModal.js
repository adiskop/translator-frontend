import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  flex: 1;
  &:first-child {
    margin-right: 10px;
  }
`;

const CloseButton = styled(Button)`
  background-color: #dc3545; /* Red color for the close button */
`;

const Modal = ({ show, onClose, onSubmit }) => {
  const [appName, setAppName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(appName);
    setAppName('');
  };

  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Add new application</h2>
        <form onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            placeholder="Application name"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            required
          />
          <ButtonContainer>
            <Button type="submit">Submit</Button>
            <CloseButton type="button" onClick={onClose}>Close</CloseButton>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;