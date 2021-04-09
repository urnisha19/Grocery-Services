import React from 'react';
import Header from '../Header/Header';

const NotMatch = () => {
    const notMatchStyle = {
        color: 'red',
        textAlign: 'center',
        margin: '0 auto',
        marginTop: '5%',
        padding: '10%',
        boxShadow: '0 0 15px 15px lightGray',
        width: '40%',
        borderRadius: '5px'
    }
    return (
        <div>
            <Header />
            <div style={notMatchStyle}>
                <h2>404 Error!!!</h2>
                <h2>Route Not Found!!!</h2>
            </div>
        </div>


    );
};

export default NotMatch;