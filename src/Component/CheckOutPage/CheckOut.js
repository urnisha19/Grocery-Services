import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Header/Header';
import './CheckOut.css';

const CheckOut = () => {
    const { productId } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [singleProduct, setSingleProduct] = useState([]);
    const { register, handleSubmit, errors } = useForm();
    const history = useHistory();

    const onSubmit = (data) => {
        fetch('https://warm-dusk-99296.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                history.push("/ordersPage");
            })
    }

    useEffect(() => {
        fetch('https://warm-dusk-99296.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                const singleProduct = data.map(product => product);
                const productInfo = singleProduct.find(data => data._id === productId);
                setSingleProduct(productInfo);
            })
    }, [])

    return (
        <div className="custom-container">
            <Header></Header>
            <div className="container">
                <div className="custom-form col-md-6 offset-md-3">
                    <h4 className="font-weight-bold text-center mb-3">Check out</h4>
                    <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
                        <h5 className="text-center">Customer Info</h5>
                        <input name="fullName" defaultValue={loggedInUser.displayName} placeholder="Full Name" ref={register({ required: true })} />
                        {errors.fullName && <span className="error">Full Name is required</span>}
                        <br />
                        <input name="email" defaultValue={loggedInUser.email} placeholder="Username or Email" ref={register({ required: true })} />
                        {errors.email && <span className="error">Email is required</span>}
                        <br />
                        <input name="date" type="date" ref={register({ required: true })} />
                        {errors.date && <span className="error">Date is required</span>}
                        <br />
                        <h5 className="text-center mt-3">Product Details</h5>
                        <input name="productName" defaultValue={singleProduct.name} placeholder="Product Name" ref={register({ required: true })} />
                        {errors.quantity && <span className="error">Product name is required</span>}
                        <br />
                        <input name="productQuantity" defaultValue={singleProduct.weight} placeholder="Quantity" ref={register({ required: true })} />
                        {errors.quantity && <span className="error">Quantity is required</span>}
                        <br />
                        <input name="productPrice" defaultValue={singleProduct.price} placeholder="Price" ref={register({ required: true })} />
                        {errors.productName && <span className="error">Price is required</span>}
                        <input type="submit" variant="primary" value="Order Placed" className="my-3 btn-block" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;