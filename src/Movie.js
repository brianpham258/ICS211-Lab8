import React from 'react';
import styled from 'styled-components';

const Movie = ({ className, name, link, color, checked }) => {
    if(checked === true) {
        return (
            <li className = {className}>{name}<a href = {link}> {link}</a></li>
        );
    }
    else {
        return null;
    }
}

const StyledMovie = styled(Movie)`
color: ${props => props.color};
font-weight: bold;
a:link {
    color: blue;
}
a:visited {
    color: blue;
}
a:hover {
    color: #ff5c33;
}
`;

export default StyledMovie;