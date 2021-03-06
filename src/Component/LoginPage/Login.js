import React, { useContext, useState } from 'react';
import logo from '../../images/logo.jpg';
import googleIcon from '../../images/icons/google.png';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { Button } from 'react-bootstrap';
import './Login.css';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: ''
    })

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const googleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    displayName: displayName,
                    email: email
                }
                setUser(signedInUser);
                setLoggedInUser(signedInUser);
                storeAuthToken();
                history.replace(from);
            })
            .catch(error => {
                console.log('error', error);
                console.log('error.message', error.message);
            });
    }
    const handleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    displayName: '',
                    email: ''
                }
                setUser(signedOutUser);
                setLoggedInUser(signedOutUser);
            })
            .catch(error => {
                console.log('error', error)
            })
    }
    // JWT token 
    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(true)
            .then(function (idToken) {
                sessionStorage.setItem('token', idToken);
            }).catch(function (error) {
                // Handle error
            });
    }
    return (
        <div className="custom-container">
            <div className="container">
                <div>
                    <Link to="/home">
                        <Button variant="primary">Go Back</Button>
                    </Link>
                </div>
                <div className="text-center">
                    <Link to="/home">
                        <img src={logo} alt="logo" className="w-25" />
                    </Link>
                </div>
                <div className="login-box col-md-6 offset-md-3">
                    <h4 className="font-weight-bold text-center">Login With</h4>
                    <button className="my-3" onClick={googleSignIn}>
                        <img src={googleIcon} alt="google-icon" /> Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;