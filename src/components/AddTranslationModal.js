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
  const [translation, setTranslation] = useState({ translationKey: '', translationValue: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Translation in modal', translation);
    await onSubmit(translation);
    setTranslation({ translationKey: '', translationValue: '' });
  };

  const handleKeyChange = (e) => {
    const { value } = e.target;
    setTranslation((prevTranslation) => ({
      ...prevTranslation,
      translationKey: value,
    }));
  };

  const handleValueChange = (e) => {
    const { value } = e.target;
    setTranslation((prevTranslation) => ({
      ...prevTranslation,
      translationValue: value,
    }));
  };

  if (!show) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Add new Translation</h2>
        <form onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            name="translationKey"
            placeholder="Translation Key"
            value={translation.translationKey}
            onChange={handleKeyChange}
            required
          />
          <StyledInput
            type="text"
            name="translationValue"
            placeholder="Translation Value"
            value={translation.translationValue}
            onChange={handleValueChange}
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