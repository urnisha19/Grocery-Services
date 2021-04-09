import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './AllProducts.css';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://warm-dusk-99296.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])  
    
    return (
        <div className="products row my-5">
            {
                products.map(product => <Product key={product._id} product={product}></Product>)
            }
        </div>
    );
};

export default AllProducts;