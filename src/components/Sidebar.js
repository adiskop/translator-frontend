import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 200px;
  background-color: #f8f9fa;
  padding: 16px;
`;

const SidebarItem = styled.div`
  padding: 10px;
  cursor: pointer;
  background-color: aliceblue;

  &:hover {
    background-color: grey;
  }
`;

const Sidebar = ({ apps, onAppClick }) => {
  const navigate = useNavigate();
  const handleNavigate = (app) => {
    navigate(`/apps/${app.id}`, { state: { app } });
  };
  return (
    <SidebarContainer>
      <h2>My Apps</h2>
      {apps.map(app => (
        <SidebarItem key={app.id} onClick={() => handleNavigate(app)}>
          {app.name}
        </SidebarItem>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;