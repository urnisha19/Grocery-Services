import React from 'react';
import { Button, Container, Form, FormControl } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import AllProducts from '../AllProducts/AllProducts';
import Header from '../Header/Header';
import './Home.css';

const Home = () => {

    return (
        <div className="home">
            <Header></Header>
            <Container className="py-5">
                <div className="d-flex justify-content-center">
                    <Form inline>
                        <FormControl type="text" placeholder="Search...." />
                        <Button variant="primary">Search</Button>
                    </Form>
                </div>
                <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    timeout={2000}
                    className="spinner my-5"
                />
                <AllProducts>
                </AllProducts>
            </Container>
        </div>
    );
};

export default Home;