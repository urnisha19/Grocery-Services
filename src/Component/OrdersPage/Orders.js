import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { UserContext } from '../../App';
import { Button } from 'react-bootstrap';
import orderedImg from '../../images/Products/ordered.jpeg';
import Header from '../Header/Header';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch('https://warm-dusk-99296.herokuapp.com/order?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setOrders(data))
    }, [])

    const deleteOrder = (id) => {
        console.log('clicked', id)
        fetch(`https://warm-dusk-99296.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    const updateItems = orders.filter(item => item._id !== id);
                    setOrders(updateItems);
                }
            })
    }

    return (
        <div className="ordersPage">
            <Header></Header>
            <Container className="py-5">
                <div className="text-center">
                    <h3>Welcome to Our Grocery Service!!</h3>
                    <h4>You have <span className="text-primary font-weight-bold">{orders.length}</span> products!!</h4>
                </div>
                <div className="d-flex justify-content-center">
                    <div className="row my-5">
                        {
                            orders.map(order =>
                                <div className="col-xl-6 col-lg-6 col-md-6 single-orders my-3" key={orders._id}>
                                    <div className="orders-info row">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <img src={orderedImg} alt="" className="img-fluid max-width: 50% height: 50%" />
                                            </div>
                                            <div className="col-md-6" >
                                                <h5>{order.productName}</h5>
                                                <h6><b>Date:</b> {new Date(order.date).toDateString('dd/MM/yyyy')}</h6>
                                                <p><b>Quantity:</b> {order.quantity}</p>
                                                <Button onClick={() => deleteOrder(order._id)} variant="light">Cancel</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Orders;