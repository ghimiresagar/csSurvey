import React, { useContext } from 'react';

import { AuthContext } from '../Context/AuthContext';
import AuthService from '../Services/AuthService';
import { Nav, Navbar } from 'react-bootstrap';

const Header = props => {
    const { setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    const authNavBar = () => {
        return (
            <Nav className="bg-light">
                <Nav.Link href="/admin/surveys/senior/edit" className="m-2 bg-light">Senior Survey</Nav.Link>
                <Nav.Link href="/admin/surveys/alumni/edit" className="m-2 bg-light">Alumni Survey</Nav.Link>
                <Nav.Link href="/admin/surveys/iab/edit" className="m-2 bg-light">IAB Survey</Nav.Link>
                <Nav.Link href="/admin/surveys/results" className="m-2 bg-light">View Results</Nav.Link>
                <Nav.Link onClick={onClickLogout} className="m-2 bg-light">Logout</Nav.Link>
            </Nav>
        )
    }

    const nauthNavBar = () => {
        return (
            null
        )
    }

    const onClickLogout = () => {
        AuthService.logout().then(data => {
            if(data.success){
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }


    return(
        <>
        <Navbar className="bg-light justify-content-between" variant="light">
            <Navbar.Brand href="/">{props.value}</Navbar.Brand>
                { isAuthenticated ? authNavBar() : nauthNavBar() }
        </Navbar> <hr/>
        </>
    );
}

export default Header;