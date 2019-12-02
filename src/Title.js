import React from 'react';
import styled from 'styled-components';

const Title = ({ className, title, subTitle }) => {
    return (
        <div className = {className}>
            <h1>{title}</h1>
            <h3>{subTitle}</h3>
        </div>
    );
}

const StyledTitle = styled(Title)`
color: #009900;
padding: 0 0 0 20px;
font-family: monospace;
margin: 0 0 20px 0;
`;

export default StyledTitle;