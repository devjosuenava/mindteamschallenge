import React from 'react';
import styled from 'styled-components';
import logo from '../../resources/logo.jpg';

const Wrapper = styled.a.attrs({
    className: 'navbar-brand',
})``

const Logo = () => {
    return (
        <Wrapper href="/">
            <img src={logo} width="50" height="50" alt="Mind Teams Challenge" />
        </Wrapper>
    )
}

export default Logo