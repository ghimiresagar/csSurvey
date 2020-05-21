import React from 'react';

import { Nav, Navbar } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class Header extends React.Component {

    render(){
        return(
            <Container>
                <Navbar className="bg-light justify-content-between" variant="light">
                    <Navbar.Brand href="/">{this.props.value}</Navbar.Brand>
                    <Nav className="bg-light">
                        <Nav.Link href="/users/surveys/senior/edit" className="m-2 bg-light">Senior Survey</Nav.Link>
                        <Nav.Link href="/users/surveys/alumni/edit" className="m-2 bg-light">Alumni Survey</Nav.Link>
                        <Nav.Link href="/users/surveys/iba/edit" className="m-2 bg-light">Iba Survey</Nav.Link>
                        <Nav.Link href="#pricing" className="m-2 bg-light">Logout</Nav.Link>
                    </Nav>
                </Navbar> <hr/> <br />
            </Container>
        );
    }
}

export default Header;