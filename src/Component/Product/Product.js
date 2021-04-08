import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = (props) => {
    const {_id,name,weight,price,imageURL} = props.product;
    return (
            <div className="col-xl-3 col-lg-3 col-md-3 single-product my-3">
            <img src={imageURL} alt=""  className="img-fluid single-product-img" />
            <h5 className="product-title text-center" >{name}-{weight}</h5>
            <h5><span className="price">${price}  </span><Link to={`/orderCheckoutPage/${_id}`} onClick={() => {props.handleCheckout(props._id,props.name)} }><button className="buy-now-btn">Buy Now</button></Link></h5>
        </div>
    );
};

export default Product;