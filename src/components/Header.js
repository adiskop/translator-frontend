import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  background-color: #343a40;
  color: white;
  padding: 16px;
  text-align: center;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <h1>Translator Manager</h1>
        </HeaderContainer>
    );
};

export default Header;