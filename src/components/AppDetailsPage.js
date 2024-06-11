import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import TranslationModal from '../components/AddTranslationModal';
import { addTranslation } from '../services/api';


const DetailContainer = styled.div`
  flex: 1;
  padding: 16px;
  margin-top: 60px;
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

const AppDetailPage = () => {
    const location = useLocation();
    const { app } = location.state || {};

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setErrorMessage('');
    };


    const handleSubmit = (translation) => {
        console.log('Translation', translation);
        addTranslation({ appId: app.id, translation }).then(data => {
            console.log('Translation added', data);
            if (app.translations == null) {
                app.translations = [];
            }
            app.translations.push(data);
            setShowModal(false);
        }).catch(error => {
            setErrorMessage(error.response.data.error);
            console.error(error.response.data.error);
        });
    };
    return (
        <>
            <Header appName={app.name} />
            <DetailContainer>
                <h2>{app.name}</h2>
                <p><strong>Last deployment:</strong> {app.lastDeploymentDate ? app.lastDeploymentDate : 'No deployments yet'}</p>

                <h3>Translations</h3>
                {app.translations && Object.keys(app.translations).length > 0 ? (
                    <ul>
                        {app.translations.map(translation => (
                            <li key={translation.key}>
                                <strong>{translation.key}:</strong> {translation.value}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No translations yet</p>
                )}

                <AddAppButton onClick={handleOpenModal}>Add New Translation</AddAppButton>
                <TranslationModal show={showModal} onSubmit={handleSubmit} onClose={handleCloseModal} />
                {errorMessage && <ErrorPopup>{errorMessage}</ErrorPopup>}
            </DetailContainer>
        </>
    );


};

export default AppDetailPage;
