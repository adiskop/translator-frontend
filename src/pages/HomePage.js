import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import AppList from '../components/AppList';
import Header from '../components/Header';
import { getApps, deployApp, downloadApp } from '../services/api';
import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
`;

const Content = styled.div`
  flex: 1;
  padding: 16px;
`;

const HomePage = () => {
    const [apps, setApps] = useState([]);
    const [selectedAppId, setSelectedAppId] = useState(null);

    useEffect(() => {
        getApps().then(data => setApps(data));
    }, []);

    const handleAppClick = id => {
        setSelectedAppId(id);
    };


    const handleDeploy = id => {
        deployApp(id).then(data => {
            const newApps = apps.map(app => app.id === id ? { ...app, lastDeploymentDate: new Date().toISOString() } : app);
            setApps(newApps);
        });
    };

    const handleDownload = id => {
        downloadApp(id);
    };

    return (
        <>
            <Header />
            <MainContainer>
                <Sidebar apps={apps} onAppClick={handleAppClick} />
                <Content>
                    <AppList apps={apps} setApps={setApps} onDeploy={handleDeploy} onDownload={handleDownload} />
                </Content>
            </MainContainer>
        </>
    );

};

export default HomePage;
