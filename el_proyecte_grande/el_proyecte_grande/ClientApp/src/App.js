import React, {Component, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import './custom.css';
import AuthorizeRoute from "./components/api-authorization/AuthorizeRoute";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState()
    const [redirectMessage, setRedirectMessage] = useState()
    
    const onRedirectMessage = (message) => {
        setRedirectMessage(message)
    }
    const onChangeAuthenticated = (authenticated) => {
        setIsAuthenticated(authenticated)
    }
    
    return (
        <Layout isAuthenticated={isAuthenticated} onChangeAuthenticated={onChangeAuthenticated}>
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, requireAuth, ...rest } = route;
                    const elementWithProps = React.cloneElement(element, 
                        {onChangeAuthenticated: onChangeAuthenticated})
                    return <Route 
                        key={index} 
                        {...rest} 
                        element={
                        requireAuth ? 
                            <AuthorizeRoute
                                {...rest} 
                                element={elementWithProps}
                            /> : elementWithProps}
                    />;}
                )}
            </Routes>
        </Layout>
    );
}
export default App;
