import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Card = styled.div`
    position: relative;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 16px;
    margin: 16px;
    width: 40%;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
`;

const AppName = styled.h2`
    position: absolute;
    top: -25px;
    left: 10px;
    background-color: #007bff; 
    color: white; 
    border-radius: 8px; 
    padding: 5px; 
    font-size: 0.85rem
`;

const AppCard = ({ app, onDeploy, onDownload }) => {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/apps/${app.id}`, { state: { app } });
    };

    return (
        <Card onClick={handleNavigate}>
            <AppName>{app.name}</AppName>
            <p>Last deployment: {app.lastDeploymentDate ? app.lastDeploymentDate : 'No deployments yet'}</p>
            <Button onClick={(e) => { e.stopPropagation(); onDownload(app.id); }}>Download on xlsx</Button>
            <Button onClick={(e) => { e.stopPropagation(); onDeploy(app.id); }}>Deploy</Button>
        </Card>
    );
};

export default AppCard;