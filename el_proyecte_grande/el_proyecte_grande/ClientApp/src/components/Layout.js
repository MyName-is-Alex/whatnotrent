import React, {Component, useState} from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

const Layout = ({children, isAuthenticated, onChangeAuthenticated}) => {
    return (
        <div>
            <NavMenu isAuthenticated={isAuthenticated} onChangeAuthenticated={onChangeAuthenticated}/>
            <Container className={"min-vw-100"} style={{ padding: 0 }}>
                {children}
            </Container>
        </div>
    )
}

export default Layout;
