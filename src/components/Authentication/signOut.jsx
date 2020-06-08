import React from 'react';
import {Link} from 'react-router-dom';
import { withFirebase } from '../FireBase';

const SignOutButton = ({ firebase }) => (
    <Link class="navbar-link" onClick={firebase.doSignOut}>
        Sign Out
    </Link>
);

export default withFirebase(SignOutButton);