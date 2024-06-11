import React, { useState } from 'react';
import AppCard from './AppCard';
import styled from 'styled-components';
import Modal from './AddApplicationModal';
import { addApp } from '../services/api';

const AppListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const AddAppButton = styled.button`
    background-color: #007bff;
    justify-content: center;
    align-items: center;
  color: white;
  border: none;
  padding: 16px;
  margin: 16px;
  border-radius: 5px;
  cursor: pointer;
  width: 400px;
  font-size: 1.25rem;
`;

const ErrorPopup = styled.div`
  background: red;
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
`;


const AppList = ({ apps, setApps, onDeploy, onDownload }) => {
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };

    const handleSubmit = (appName) => {
        console.log('New application name:', appName);
        addApp(appName).then(data => {
            const newApps = [...apps, data];
            setApps(newApps);
            setShowModal(false);
        }).catch(error => {
            setErrorMessage(error.response.data.error);
            console.error(error.response.data.error);
        });

    };
    return (
        <>
            <AppListContainer>
                {apps.map(app => (
                    <AppCard
                        key={app.id}
                        app={app}
                        onDeploy={onDeploy}
                        onDownload={onDownload}
                    />
                ))}
            </AppListContainer>
            <AddAppButton onClick={handleOpenModal}>Add New Application</AddAppButton>
            <Modal show={showModal} onSubmit={handleSubmit} onClose={handleCloseModal} />
            {errorMessage && <ErrorPopup>{errorMessage}</ErrorPopup>}
        </>
    );
};

export default AppList;