import React from 'react';
import Survey from './surveys_layout_dashboard';

import Container from 'react-bootstrap/Container';

/**
 * This is the layout of the dashboard.
 * This was created because I couldn't pass props or read them once PrivateRoute was created.
 * So, I made this Component to pass three components with values.
 */

function Dashboard() {
    return (
        <Container>
            <Survey name="Senior" />
            <Survey name="Alumni" />
            <Survey name="Iba" />
        </Container>
    );
}

export default Dashboard;